function draw_chart(data) {
//alert("ll")
    //document.getElementById("loader").style.display=""
    document.getElementById("analysis").style.display="none"
    if(type =='lac'){//Branch-wise Latency with Accuracy & Threshold Chart
        inference_accuracy_chart(data,threshold,branch,'myChart',get_title(branch,threshold),type);
    }else if(type =='lbc')
        inference_branch_chart(data,branches,'myChart',"Overall Processing-time in Each Branch",type)
    else if(type =='mlt')
        inference_confidence_chart(data,thresholds,'myChart',"Overall Processing Time against Threshold",type)
    else if(type =='ltc')
        inference_threshold_chart(data,thresholds,'myChart',"Latency Vs Threshold Chart")
    else if(type =='oic')
        overall_inference_confidence_chart(data,thresholds,'myChart',"Overall Branch-wise Latency with Threshold",type)
    //document.getElementById("loader").style.display="none"
}
function overall_inference_confidence_chart(data,thresholds,canvas_id,title,chart_type){
    data_=get_branch_and_threshold_wise_data(data)
    draw_line_chart(canvas_id,thresholds,data_[0],data_[1],data_[2],data_[3],title)
    display_observation(chart_type,0,0)
}
function get_branch_and_threshold_wise_data(data){
    data_=get_threshold_wise_branches(data)
    branch_2=[];branch_3=[];branch_4=[]; branch_5=[]

    for (var i = 0; i < data_.length; i++) {
        z=data_[i]

        a=0;b=0;c=0;d=0;e=0;k=0
        exit_2=[];exit_3=[];exit_4=[];exit_5=[]
        for (var j = 0; j < z.length; j++) {
             if (z[j].nr_branch_edge==2)
                exit_2[a++]=z[j].inference_time
             else if (z[j].nr_branch_edge==3)
                exit_3[b++]=z[j].inference_time
             else if (z[j].nr_branch_edge==4)
                exit_4[c++]=z[j].inference_time
             else if (z[j].nr_branch_edge==5)
                exit_5[d++]=z[j].inference_time
           }
           if (exit_2.length > 0)
            branch_2[branch_2.length]=d3.sum(exit_2)/exit_2.length
           if (exit_3.length > 0)
                branch_3[branch_3.length]=d3.sum(exit_3)/exit_3.length
           if (exit_4.length > 0)
             branch_4[branch_4.length]=d3.sum(exit_4)/exit_4.length
           if (exit_5.length > 0)
            branch_5[branch_5.length]=d3.sum(exit_5)/exit_5.length
        }
    return [branch_2,branch_3,branch_4,branch_5]
}


function inference_confidence_chart(data,thresholds,canvas_id,title,chart_type){
    data_=get_threshold_wise_data(data)
    val_=[],i=0
    for(x=0;x<data_.length;x++){
        val_[i++]=(d3.sum(data_[x])/data_[x].length)
    }

    draw_single_line_chart(canvas_id,thresholds,val_,title)
    display_observation(chart_type,0,0)
}
function get_threshold_wise_data(data){
    t_1=[]
    t_2=[]
    t_3=[]
    t_4=[]
    t_5=[]
    a=0;b=0;c=0;d=0;e=0

    for (var i = 0; i < data.length; i++) {
        if (data[i].p_tar==0.7)
             t_1[a++]=data[i].inference_time
        else if (data[i].p_tar==0.75)
             t_2[b++]=data[i].inference_time
        else if (data[i].p_tar==0.8)
             t_3[c++]=data[i].inference_time
        else if (data[i].p_tar==0.85)
             t_4[d++]=data[i].inference_time
        else
             t_5[e++]=data[i].inference_time
        }
        return[t_1,t_2,t_3,t_4,t_5]

}

function get_threshold_wise_branches(data){
    t_1=[]
    t_2=[]
    t_3=[]
    t_4=[]
    t_5=[]
    a=0;b=0;c=0;d=0;e=0

    for (var i = 0; i < data.length; i++) {
        if (data[i].p_tar==0.7)
             t_1[a++]={"nr_branch_edge":data[i].nr_branch_edge,"inference_time":data[i].inference_time}
        else if (data[i].p_tar==0.75)
             t_2[b++]={"nr_branch_edge":data[i].nr_branch_edge,"inference_time":data[i].inference_time}
        else if (data[i].p_tar==0.8)
             t_3[c++]={"nr_branch_edge":data[i].nr_branch_edge,"inference_time":data[i].inference_time}
        else if (data[i].p_tar==0.85)
             t_4[d++]={"nr_branch_edge":data[i].nr_branch_edge,"inference_time":data[i].inference_time}
        else if (data[i].p_tar==0.9)
             t_5[e++]={"nr_branch_edge":data[i].nr_branch_edge,"inference_time":data[i].inference_time}
        }
        return[t_1,t_2,t_3,t_4,t_5]

}

function inference_branch_chart(data,branches,canvas_id,title,type){
    data_=get_branch_wise_data(data)
    values=[d3.sum(data_[0])/data_[0].length,d3.sum(data_[1])/data_[1].length,d3.sum(data_[2])/data_[2].length,d3.sum(data_[3])/data_[3].length]
    draw_bar_chart(canvas_id,branches,values,title)
    display_observation(type,0,0)
}
function draw_bar_chart(canvas_id,branches,values,title){
      new Chart(document.getElementById(canvas_id), {
          type: 'bar',
          data: {
            labels: branches,
            datasets: [
              {
                label: "Processing Time",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: values,
                fontColor: "#050E47",
                fontStyle: "bold",

              }
            ]
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
              text: title,
              fontColor: "#050E47",
              fontStyle: "bold",
            },
            scales: {
                xAxes: [{scaleLabel: {
                 	        display: true,
                 	        labelString: "Branches",
                 	        fontColor: "#050E47",
                            fontStyle: "bold",
                          }

                }],
                yAxes: [{scaleLabel: {
                 	        display: true,
                 	        labelString: "Processing time in seconds",
                 	        fontColor: "#050E47",
                            fontStyle: "bold",
                 	    }

                }]
                }
          }
      });
}


function inference_threshold_chart(data,thresholds,canvas_id,title){
    data_=get_branch_wise_data(data)
    draw_line_chart(canvas_id,thresholds,data_[0],data_[1],data_[2],data_[3],title)
}
function get_branch_wise_data(data){
   exit_2=[]
    exit_3=[]
    exit_4=[]
    exit_5=[]
    m=[]
    a=0;b=0;c=0;d=0
    for (var i = 0; i < data.length; i++) {
        if (data[i].nr_branch_edge==2)
             exit_2[a++]=data[i].inference_time
        else if (data[i].nr_branch_edge==3)
             exit_3[b++]=data[i].inference_time
        else if (data[i].nr_branch_edge==4)
             exit_4[c++]=data[i].inference_time
        else
            exit_5[d++]=data[i].inference_time

        }
        return[exit_2,exit_3,exit_4,exit_5]
}
function draw_line_chart(canvas_id,thresholds,exit_2,exit_3,exit_4,exit_5,title){

    // Line chart
    new Chart(document.getElementById(canvas_id), {
        type: 'line',
        data: {
            labels: thresholds,
            datasets: [
                {
                    data: exit_2,
                    label: "Exit Point 2",
                    borderColor: "#C70039",
                    fill: false
                }, {
                    data: exit_3,
                    label: "Exit Point 3",
                    borderColor: "#FFC300",
                    fill: false
                }, {
                    data: exit_4,
                    label: "Exit Point 4",
                    borderColor: "#1f618d",
                    fill: false
                }, {
                    data: exit_5,
                    label: "Exit Point 5",
                    borderColor: "#1e8449",
                    fill: false
                }
            ]
        },
        options: {
                title: {
                display: true,
                text: title
            },
            scales: {
                xAxes: [{ticks: {min: 0.6, max:1},
                     scaleLabel: {
                 	        display: true,
                 	        labelString: "Threshold",
                 	    }
                }],
                yAxes: [{ticks: {min: 0.01, max:0.4},
                 scaleLabel: {
                 	        display: true,
                 	        labelString: "Processing Time in seconds",
                 	    }


                }],
            },
            hover: {
                mode: 'index',
                intersect: true
            },
        }
    });
}
//xAxes: [{ticks: {min: 0.6, max:1}}],
//yAxes: [{ticks: {min: 0.05, max:0.45}}],
function draw_single_line_chart(canvas_id,thresholds,values,title){
    // Line chart
    new Chart(document.getElementById(canvas_id), {
        type: 'line',
        data: {
            labels: thresholds,
            datasets: [
                {
                    data: values,
                    label: "Confidence",
                    borderColor: "#C70039",
                    fill: false
                }
            ]
        },
        options: {
         legend: {display: false},
                title: {
                display: true,
                text: title,
                fontColor: "#050E47",
                fontStyle: "bold",
            },
            scales: {
                xAxes: [{ticks: {min: 0.6, max:1},
                         scaleLabel: {
                 	        display: true,
                 	        labelString: "Threshold",
                 	        fontColor: "#050E47",
                            fontStyle: "bold",
                 	    }

                }],
                yAxes: [{ticks: {min: 0.05, max:0.45},
                    scaleLabel: {
                 	    display: true,
                 	    labelString: "Processing time in seconds",
                 	    fontColor: "#050E47",
                        fontStyle: "bold",
                 	},

                }],
            },
            hover: {
                mode: 'index',
                intersect: true
            },
        }
    });
}

function draw_scatter_chart(canvas_id,xy_values,colors,X_min,X_max,Y_min,Y_max,title,branch_s,threshold_s){
    chart=new Chart(canvas_id, {
        type: "scatter",
        data: {
            datasets: [{
            pointRadius: 4,
            pointBackgroundColor: colors,
            data: xy_values
            }]
        },
        options: {
            legend: {display: false},
            scales: {
                xAxes: [{ticks: {min: X_min, max:X_max,fontColor: "#050E47",fontStyle: "bold",},
                    scaleLabel: {
                      display: true,
                      labelString: "Input sample",
                      fontColor: "#050E47",
                      fontStyle: "bold",
                      fontSize: 15,
                    },


                }],
                yAxes: [{ticks: {min: Y_min, max:Y_max,fontColor: "#050E47",fontStyle: "bold"},
                    scaleLabel: {
                      display: true,
                      labelString: "Latency in seconds",
                      fontColor: "#050E47",
                      fontStyle: "bold",
                      fontSize: 15,
                    },


                }],
            },
            title: {
                display: true,
                text: title,
                fontColor: "#050E47",
                fontSize: 16,
                fontWeight: "normal",

            },
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                          return "Branch:"+parseInt(branch_s[tooltipItem[0]['index']])
                          +" Threshold:"+threshold_s[tooltipItem[0]['index']];
                    },

                }

            }
        }
    });
}

function get_condition(threshold,branch,val){
    branch=(branch==" ")?-1:branch
    threshold=(threshold==" ")?-1:threshold
    if(branch==-1 && threshold==-1 )
        return true;
    else if(branch!=-1 && threshold !=-1 && val[0]==branch && val[1] ==threshold )
        return true;
    else if(branch!=-1 && threshold ==-1 &&   val[0]==branch )
        return true
    else if(branch==-1 && threshold !=-1 && val[1] ==threshold )
        return true
    return false;
}

function inference_accuracy_chart(data,threshold,branch,canvas_id,title,chart_type){
    var colors=[]
    var xy_values=[]
    var branch_s=[]
    var threshold_s=[]
    j=0 //data[i].no
    for (var i = 0; i < data.length; i++) {

         if (get_condition(threshold,branch,[data[i].nr_branch_edge ,data[i].p_tar])){
             xy_values[j]={y:(data[i].inference_time),x:j}
             branch_s[j]=data[i].nr_branch_edge
             threshold_s[j]=data[i].p_tar
             if(data[i].isTerminate==0 || data[i].isTerminate==0.0)
                   colors[j]='red'
              else
                    colors[j]='rgb(0,0,255)'
            j++
         }
    }
    //max=(threshold ==-1 && branch == -1)?10000:(branch==2)?800 :1000
    max=j
draw_scatter_chart(canvas_id,xy_values,colors,1,max,0.01,0.7,title,branch_s,threshold_s)
display_observation(chart_type,threshold,branch)
//analysis conclusion

}

function display_observation(chart_type,threshold1,branch1){
    txt=''
    if(chart_type == 'lac'){
        threshold = (threshold1 == -1) ?'0.1': threshold1+""
        branch =  (branch1 == -1) ?'1': branch1+""
        threshold = threshold.split(".")[1]
        key=(threshold=='1' && branch != '1')?"b":(threshold != '1' && branch == '1')?"t":threshold+"_"+branch
        txt=observation[key]
        txt= key =='b'?txt.replace("$$",branch1):(key == 't' ? txt.replace("$$",threshold1) : txt)

    }else if(chart_type == 'lbc'){
        txt=observation['lbc']
    }else if(chart_type == 'mlt'){
        txt=observation['mlt']
    }else if(chart_type == 'oic'){
        txt=observation['oic']
    }

    document.getElementById("conclusion").innerHTML=txt
    document.getElementById("analysis").style.display="block"
}


 function makeChart(data) {
    var colors=[]
     var xy_values=[]
    j=0
    for (var i = 0; i < data.length; i++) {
         if (data[i].nr_branch_edge > 0){
         //xy_values[j]={y:(data[i].inference_time*1000),x:data[i].p_tar}
             xy_values[j]={x:(data[i].inference_time*1000),y:data[i].no}
       //   xy_values[j]={y:(data[i].nr_branch_edge),x:data[i].p_tar}
             if(data[i].isTerminate==0 || data[i].isTerminate==0.0)
                   colors[j]='red'
              else
                    colors[j]='rgb(0,0,255)'

            j++
         }
    }
     // var inference = data.map(function(d) {return {x:(d.inference_time*1000),y:d.nr_branch_edge}});

new Chart("myChart", {
  type: "scatter",
  data: {
    datasets: [{
      pointRadius: 4,
      pointBackgroundColor: colors,
      data: xy_values
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      xAxes: [{ticks: {min: 100, max:1000}}],
      yAxes: [{ticks: {min: 1, max:500}}],
    }
  }
});


      }
function get_title(branch,threshold){
    title=''
        if(branch==-1)
            title=title+"Branch: 1-5"
        else
            title=title+"Branch: "+branch
        if(threshold==-1)
            title=title+" Threshold: 0.7-0.9"
        else
            title=title+" Threshold: "+threshold
    return title
}

function draw_line_chart(canvas_id,thresholds,exit_2,exit_3,exit_4,exit_5,title){

    // Line chart
    new Chart(document.getElementById(canvas_id), {
        type: 'line',
        data: {
            labels: thresholds,
            datasets: [
                {
                    data: exit_2,
                    label: "Exit Point 2",
                    borderColor: "#C70039",
                    fill: false
                }, {
                    data: exit_3,
                    label: "Exit Point 3",
                    borderColor: "#FFC300",
                    fill: false
                }, {
                    data: exit_4,
                    label: "Exit Point 4",
                    borderColor: "#1f618d",
                    fill: false
                }, {
                    data: exit_5,
                    label: "Exit Point 5",
                    borderColor: "#1e8449",
                    fill: false
                }
            ]
        },
        options: {
                title: {
                display: true,
                text: title
            },
            scales: {
                xAxes: [{ticks: {min: 0.6, max:1},
                     scaleLabel: {
                 	        display: true,
                 	        labelString: "Threshold",
                 	    }
                }],
                yAxes: [{ticks: {min: 0.01, max:0.4},
                 scaleLabel: {
                 	        display: true,
                 	        labelString: "Processing Time in seconds",
                 	    }


                }],
            },
            hover: {
                mode: 'index',
                intersect: true
            },
        }
    });
}
//xAxes: [{ticks: {min: 0.6, max:1}}],
//yAxes: [{ticks: {min: 0.05, max:0.45}}],
function draw_single_line_chart(canvas_id,thresholds,values,title){
    // Line chart
    new Chart(document.getElementById(canvas_id), {
        type: 'line',
        data: {
            labels: thresholds,
            datasets: [
                {
                    data: values,
                    label: "Confidence",
                    borderColor: "#C70039",
                    fill: false
                }
            ]
        },
        options: {
         legend: {display: false},
                title: {
                display: true,
                text: title,
                fontColor: "#050E47",
                fontStyle: "bold",
            },
            scales: {
                xAxes: [{ticks: {min: 0.6, max:1},
                         scaleLabel: {
                 	        display: true,
                 	        labelString: "Threshold",
                 	        fontColor: "#050E47",
                            fontStyle: "bold",
                 	    }

                }],
                yAxes: [{ticks: {min: 0.05, max:0.45},
                    scaleLabel: {
                 	    display: true,
                 	    labelString: "Processing time in seconds",
                 	    fontColor: "#050E47",
                        fontStyle: "bold",
                 	},

                }],
            },
            hover: {
                mode: 'index',
                intersect: true
            },
        }
    });
}
////---------------------Training code starts------------------------------
function enableFields(type,branch=-1,training_type=-1){
    if(type=='ave'|| type=='tte'){
        document.getElementById("branchesID").disabled = false;
        document.getElementById("training_typeID").disabled = false;
         document.getElementById("branchesID").value=branch
        document.getElementById("training_typeID").value=training_type
    }else if(type=='ttx' || type=='aex'){
        document.getElementById("branchesID").disabled = true;
        document.getElementById("training_typeID").disabled = false;
        document.getElementById("training_typeID").value=training_type
    }else{
        document.getElementById("branchesID").disabled = true;
        document.getElementById("training_typeID").disabled = true;
        document.getElementById("branchesID").value=branch
        document.getElementById("training_typeID").value=training_type
    }

}

function enableflds(branch,training_type,type){
     if( branch  && branch != ""  && branch !=-1){
    document.getElementById("branchesID").disabled = false;
    document.getElementById("branchesID").value=branch
    }

    if(training_type &&  training_type != "None" && training_type != ""  && training_type != -1){
        document.getElementById("training_typeID").disabled = false;
        document.getElementById("training_typeID").value=training_type
        }

      }
function draw_single_line_chart_training(canvas_id,thresholds,values,XYscale,title){
    // Line chart
    new Chart(document.getElementById(canvas_id), {
        type: 'line',
        data: {
            labels: thresholds,
            datasets: [
                {
                    data: values,
                    label: "Confidence",
                    borderColor: "#C70039",
                    fill: false
                }
            ]
        },
        options: {
         legend: {display: false},
                title: {
                display: true,
                text: title,
                fontColor: "#050E47",
                fontStyle: "bold",
            },
            scales: {
                xAxes: [{ticks: {min: XYscale[0], max:XYscale[1]},
                         scaleLabel: {
                 	        display: true,
                 	        labelString: "Epochs",
                 	        fontColor: "#050E47",
                            fontStyle: "bold",
                 	    }

                }],
                yAxes: [{ticks: {min: XYscale[2], max:XYscale[3]},
                    scaleLabel: {
                 	    display: true,
                 	    labelString: "Accuracy",
                 	    fontColor: "#050E47",
                        fontStyle: "bold",
                 	},

                }],
            },
            hover: {
                mode: 'index',
                intersect: true
            },
        }
    });
}
function get_condition_training(branch,epochs,val){
    //training_type=(training_type==" ")?-1:training_type
    branch=(branch==" ")?-1:branch
    epochs=(epochs==" ")?-1:epochs
    if(branch==-1 && epochs==-1  )
        return true;
    else if(branch!=-1 && epochs !=-1 && val[0]==branch && val[1] ==epochs )
        return true;
    else if(branch!=-1 && epochs ==-1 &&   val[0]==branch )
        return true
    else if(branch==-1 && epochs !=-1 && val[1] ==epochs )
        return true
    return false;
}
function draw_basemodel_chart(data,branch,training_type,canvas_id,X_values,title){
    data_=[];a=0
     for (var i = 0; i < data.length; i++) {
        if (get_condition_training(training_type,branch,[data[i].type ,data[i].exit])){
              data_[a++]=data[i].accuracy
        }
     }
     draw_single_line_chart_training(canvas_id,X_values,data_,[10,100,0.6,.9],title)

 }
 function draw_basemodel_chart_tte(data,branch,training_type,canvas_id,X_values,title){
    data_=[];a=0
     for (var i = 0; i < data.length; i++) {
        if (get_condition_training(training_type,branch,[data[i].type ,data[i].exit])){
              data_[a++]=data[i].timec
        }
     }
     draw_single_line_chart_training(canvas_id,X_values,data_,[10,100,10,3000],title)

 }
 function draw_multiple_line_chart_training(canvas_id,X_values,Y_values,title,X_scale,Y_scale){
    // Line chart
    new Chart(document.getElementById(canvas_id), {
        type: 'line',
        data: {
            labels: X_values,
            datasets: Y_values
        },
        options: {
                title: {
                display: true,
                text: title
            },
            scales: {
                xAxes: [{ticks: {min: X_scale[0], max:X_scale[1]},
                     scaleLabel: {
                 	        display: true,
                 	        labelString: "Echos",
                 	    }
                }],
                yAxes: [{ticks: {min: Y_scale[0], max:Y_scale[1]},
                 scaleLabel: {
                 	        display: true,
                 	        labelString: "Accuracy",
                 	    }


                }],
            },
            hover: {
                mode: 'index',
                intersect: true
            },
        }
    });
}
function draw_model_chart(data,training_type,branch,canvas_id,X_values,n_branch,title,field){

    //if(branch == "" || branch == -1){
        Y_values=get_model_chart_data(data,n_branch,training_type,field,'line')
         X_scale=(field=='acc')?[10,100]:[10,100]
         Y_scale=(field=='acc')?[0.6,0.9]:[40,900]
        draw_multiple_line_chart_training(canvas_id,X_values,Y_values,title,X_scale,Y_scale);
}
function draw_time_chart(data,training_type,branch,canvas_id,X_values,n_branch,title){
    if(branch == "" || branch == -1){
        Y_values=get_time_chart_data(data,n_branch,training_type)
        draw_multiple_line_chart_training(canvas_id,X_values,Y_values,title);
    }else{

    }

}
function get_branch_wise_data_training(data,training_type,branch,canvas_id,X_values,n_branch,title,field,Ylabel){
    if(training_type == 1){
        alert("You selected Base Model")
        return false
    }

    data_=get_model_chart_data(data,n_branch,training_type,field,'bar')
    Y_scale=(field=='timec')?[Math.floor(d3.min(data_)-200),Math.ceil(d3.max(data_))]:[0.45,1]
    draw_bar_chart_training(canvas_id,X_values,data_,Y_scale,title,Ylabel)
}
function get_branch_wisebbb_data(data){
   exit_2=[]
    exit_3=[]
    exit_4=[]
    exit_5=[]
    m=[]
    a=0;b=0;c=0;d=0
    for (var i = 0; i < data.length; i++) {
        if (data[i].nr_branch_edge==2)
             exit_2[a++]=data[i].inference_time
        else if (data[i].nr_branch_edge==3)
             exit_3[b++]=data[i].inference_time
        else if (data[i].nr_branch_edge==4)
             exit_4[c++]=data[i].inference_time
        else
            exit_5[d++]=data[i].inference_time

        }
        return[exit_2,exit_3,exit_4,exit_5]
}

 function get_model_chart_data(data,n_branch,training_type,field='acc',chart_t='line'){
    //BRANCHES_PER_MODEL
    data_=[];a=0
    br_1=[];br_2=[];br_3=[];br_4=[];br_5=[];br_6=[];br_7=[];br_8=[];br_9=[];br_10=[];
    a=0;b=0;c=0;d=0;e=0;f=0;g=0;h=0;i=0;j=0;
     for (var i = 0; i < data.length; i++) {
        val_=(field == 'acc')?data[i].accuracy:data[i].timec

      if(data[i].type==training_type){
        if (n_branch > 0 && data[i].exit == 1 ){
              br_1[a++]=val_
        }
        if (n_branch > 1 && data[i].exit== 2 ){
              br_2[b++]=val_
        }
        if (n_branch > 2 && data[i].exit == 3 ){
              br_3[c++]=val_
        }
        if (n_branch > 3 && data[i].exit== 4 ){
              br_4[d++]=val_
        }
        if (n_branch > 4 && data[i].exit == 5 ){
              br_5[e++]=val_
        }
        if (n_branch > 5 && data[i].exit == 6 ){
              br_6[f++]=val_
        }
        if (n_branch > 6 && data[i].exit == 7 ){
              br_7[g++]=val_
        }
        if (n_branch > 7 && data[i].exit == 8 ){
              br_8[h++]=val_
        }
        if (n_branch > 8 && data[i].exit ==  9){
              br_9[i++]=val_
        }
        if (n_branch > 9 && data[i].exit == 10 ){
              br_10[j++]=val_
        }
        }
        }
    if(chart_t == 'bar')
        return getAvgValues([br_1,br_2,br_3,br_4,br_5,br_6,br_7,br_8,br_9,br_10]);
    else
     return set_color_and_data([br_1,br_2,br_3,br_4,br_5,br_6,br_7,br_8,br_9,br_10]);
 }
 function getAvgValues(Y_values){
    data_=[]
    for ( x in Y_values){
        if (Y_values[x] !=""){
            data_.push(d3.sum(Y_values[x])/Y_values[x].length)
        }

    }
 return data_

 }
function set_color_and_data(data_){

 data_values=[]
if (data_[0]!=""){
            data_values.push({
                    data: data_[0],
                    label: "Exit Point 1",
                    borderColor: "#1f618d",
                    fill: false
                })
        }
        if (data_[1] !=""){
            data_values.push({
                    data: data_[1],
                    label: "Exit Point 2",
                    borderColor: "#1e8449",
                    fill: false
                })
        }
        if (data_[2] !=""){
            data_values.push({
                    data: data_[2],
                    label: "Exit Point 3",
                    borderColor: "red",
                    fill: false
                })
        }
        if (data_[3] !=""){
            data_values.push({
                    data: data_[3],
                    label: "Exit Point 4",
                    borderColor: "#FFC300",
                    fill: false
                })
        }
        if (data_[4] !=""){
            data_values.push({
                    data: data_[4],
                    label: "Exit Point 5",
                    borderColor: "#1B218d",
                    fill: false
                })
        }
        if (data_[5] !=""){
            data_values.push({
                    data: data_[5],
                    label: "Exit Point 6",
                    borderColor: "#1f998d",
                    fill: false
                })
        }
        if (data_[6] !=""){
            data_values.push({
                    data: data_[6],
                    label: "Exit Point 7",
                    borderColor: "#1c618d",
                    fill: false
                })
        }
        if (data_[7] !=""){
            data_values.push({
                    data: data_[7],
                    label: "Exit Point 8",
                    borderColor: "#1f618a",
                    fill: false
                })
        }
        if (data_[8] !=""){
            data_values.push({
                    data: data_[8],
                    label: "Exit Point 9",
                    borderColor: "#1a618d",
                    fill: false
                })
        }
        if (data_[9] !=""){
            data_values.push({
                    data: data_[9],
                    label: "Exit Point 10",
                    borderColor: "#1d218d",
                    fill: false
                })
        }


return data_values;
}
function draw_training_time_vs_type_chart(data,canvas_id,title){
     data_=get_type_wise_data(data,"time")
     X_values=["Base Model","Joint Training","Layered Training","Separate Training"]
     //alert(data_[1])
     Y_values=[data_[1],d3.sum(data_[2]),d3.sum(data_[3]),d3.sum(data_[4])]
    draw_bar_chart_training(canvas_id,X_values,Y_values,[ Math.floor(d3.min(Y_values)-200),Math.ceil(d3.max(Y_values))],title,"Training Time in sec.")

     //alert(Object.keys(data_[0]))//Y_values=[d3.sum(data_[1]),d3.sum(data_[2]),d3.sum(data_[3]),d3.sum(data_[4])]
     //alert(Object.values(data_[0]))
    // Y_values=Object.values(data_[0])

     //values=[d3.sum(data_[1])/data_[1].length,d3.sum(data_[2])/data_[2].length,d3.sum(data_[3])/data_[3].length,d3.sum(data_[4])/data_[4].length]
     //draw_bar_chart(canvas_id,branches,values,title)
     //display_observation(type,0,0)
}
function draw_training_time_vs_accuracy_chart(data,canvas_id,title){
     data_=get_type_wise_data(data,"acc")
     X_values=["Base Model","Joint Training","Layered Training","Separate Training"]
     Y_values=[d3.sum(data_[1]),d3.sum(data_[2])/data_[2].length,d3.sum(data_[3])/data_[3].length,d3.sum(data_[4])/data_[4].length]
     draw_bar_chart_training(canvas_id,X_values,Y_values,[ Math.floor(d3.min(Y_values)),Math.ceil(d3.max(Y_values))],title,"Accuracy")
}
function draw_training_time_vs_branch_chart(data,canvas_id,title){
     data_=get_branch_wise_data(data,"timec")
     X_values=["Base Model","Joint Training","Layered Training","Separate Training"]
     Y_values=[d3.sum(data_[1]),d3.sum(data_[2])/data_[2].length,d3.sum(data_[3])/data_[3].length,d3.sum(data_[4])/data_[4].length]
     //alert(Y_values)
     draw_bar_chart_training(canvas_id,X_values,Y_values,[ Math.floor(d3.min(Y_values)),Math.ceil(d3.max(Y_values))],title,"Accuracy")

     //alert(Object.keys(data_[0]))//Y_values=[d3.sum(data_[1]),d3.sum(data_[2]),d3.sum(data_[3]),d3.sum(data_[4])]
     //alert(Object.values(data_[0]))
    // Y_values=Object.values(data_[0])

     //values=[d3.sum(data_[1])/data_[1].length,d3.sum(data_[2])/data_[2].length,d3.sum(data_[3])/data_[3].length,d3.sum(data_[4])/data_[4].length]
     //draw_bar_chart(canvas_id,branches,values,title)
     //display_observation(type,0,0)
}

function getRange(max){
data=[]
for (i=1;i<=max;i++)
    data.push(i)
 return data
}
function get_type_wise_data(data,field){
    type_1=[]
    type_2=[]
    type_3=[]
    type_4=[]
    m={}
    a=0;b=0;c=0;d=0
    for (var i = 0; i < data.length; i++) {
        val_=(field=='acc')?data[i].accuracy :data[i].timec
         if(data[i].epochs==100)
            m[data[i].type]= val_
        if (data[i].type==1 && data[i].epochs==100){
            type_1[d++]=val_
        }else if (data[i].type==2  && data[i].epochs==100){
            type_2[a++]=val_
        }else if (data[i].type==3 && data[i].epochs==100){
            type_3[b++]=val_
        }else if (data[i].type==4 && data[i].epochs==100){
            type_4[c++]=val_
            }
    }
    return[m,type_1,type_2,type_3,type_4]
}
function draw_bar_chart_training(canvas_id,branches,values,Y_scale,title,Y_title){
//alert(d3.min(values))
      new Chart(document.getElementById(canvas_id), {
          type: 'bar',
          data: {
            labels: branches,
            datasets: [
              {
                label: Y_title,
                backgroundColor: ["red", "green","blue","orange","yellow"],
                data: values,
                fontColor: "#050E47",
                fontStyle: "bold",

              }
            ]
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
              text: title,
              fontColor: "#050E47",
              fontStyle: "bold",
            },
            scales: {

                xAxes: [
                    {scaleLabel: {
                 	        display: true,
                 	        labelString: "Training Type",
                 	        fontColor: "#050E47",
                            fontStyle: "bold",
                          }

                }],
                yAxes: [{ticks: {min:Y_scale[0], max:Y_scale[1]},
                    scaleLabel: {
                 	        display: true,
                 	        labelString: Y_title,
                 	        fontColor: "#050E47",
                            fontStyle: "bold",
                 	    }

                }]
                }
          }
      });
}

function validate(){
    mo=document.getElementById("modelID").value
    da=mo=document.getElementById("datasetID").value
//alert(mo)
 if(mo=='alexnet' || da== 'caltech256' || da== 'cifar100'){
        alert("Not Implemented Yet!")
        return false;
    }
    return true
}
function validate1(){
    //alert("type: "+type+" training_type: "+training_type+" branch:"+branch)
    if(type=='ave' || type=='aex'){

        if(training_type == -1 || training_type == '-1'|| training_type == 'None'){
            alert ("Please select training_type ")
            return false
        }
         /*if(training_type != '1' && (!branch || branch == -1 || branch == None )){
            alert ("Please select branch ")
            return false
        }*/


    }
    if(type=='ttx'){
        if(training_type == -1){
            alert("Please select training type")
            return false
        }
        }
    return true
}

function draw_chart_training(data){
    if(validate1()){
        if(type=='ttt'){
           draw_training_time_vs_type_chart(data,"myChart","Training Time Vs. Training Type Chart")
        }
        if(type=='tta'){
           draw_training_time_vs_accuracy_chart(data,"myChart","Accuracy Vs. Training Type Chart")
        }
        if(type=='ave'){
            if(training_type == 1 || branch != -1)
                draw_basemodel_chart(data,branch,training_type,"myChart",epochs_data,"Accuracy Vs. Epochs Chart")
            else{
               draw_model_chart(data,training_type,branch,"myChart",epochs_data,BRANCHES_PER_MODEL[model],"Accuracy Vs. Epochs Chart",'acc')
             }
        }else if(type=='tte'){
            if(training_type == 1 || branch != -1)
                draw_basemodel_chart_tte(data,branch,training_type,"myChart",epochs_data,"Training Time Vs.Epochs Chart")
            else{

              draw_model_chart(data,training_type,branch,"myChart",epochs_data,BRANCHES_PER_MODEL[model],"Training Time Vs.Epochs Chart",'timec')
            }
        }
        else if(type=='ttx'){
        get_branch_wise_data_training(data,training_type,branch,"myChart",getRange(BRANCHES_PER_MODEL[model]),BRANCHES_PER_MODEL[model],"Training Time Vs Exit Branch Chart",'timec',"Training Time in sec.")

        }
        else if(type=='aex'){
        get_branch_wise_data_training(data,training_type,branch,"myChart",getRange(BRANCHES_PER_MODEL[model]),BRANCHES_PER_MODEL[model],"Accuracy Vs Exit Branch Chart",'acc',"Accuracy")

        }
        }

}
