# ⚡ EEDNN-EdgeCloud — Interactive Edge–Cloud Dashboard for Early-Exit DNNs

An adaptive inference platform that executes **Early-Exit Deep Neural Networks (EEDNNs)** across **edge and cloud** environments, featuring an interactive Flask dashboard for **real-time analysis, image recognition, and training strategy visualization**.

> 🧠 The *Inference Analysis* module - the study from  
> **Haseena Rahmath P., Vishal Srivastava, and Kuldeep Chaurasia**  
> “*A Strategy to Accelerate the Inference of a Complex Deep Neural Network*,”  
> *ICDAM 2022 (Springer Nature, 2023)* — [DOI: 10.1007/978-981-19-7615-5_5](https://doi.org/10.1007/978-981-19-7615-5_5)

---
## 🎥 Demo Video

Experience how **EEDNN-EdgeCloud** enables adaptive inference across edge and cloud environments — combining real-time image recognition, early-exit control, and performance visualization.
The video demonstrates how users can:

* Upload images and view **exit-wise predictions** and confidence levels
* Dynamically adjust **thresholds and branch depths** to explore accuracy–latency trade-offs
* Compare **training strategies** and inference behaviors through **interactive charts** powered by *Chart.js* and *D3.js*

[![EEDNN-EdgeCloud Demo](https://img.youtube.com/vi/rkwtwHcaorE/hqdefault.jpg)](https://youtu.be/rkwtwHcaorE)

> 📺 Click the image above to watch the full demo on YouTube.


## 🚀 Overview
This system demonstrates how **early-exit policies** balance *accuracy* and *latency* in deep neural networks.  
It provides a **Flask-based edge–cloud architecture** where users can upload images, visualize per-exit predictions, and analyze performance under different thresholds or training strategies.

---

## 💡 Key Features
- **Unified Flask Application:** Launch directly using `edgeWebAPI.py` — configuration handled automatically via `config.py`.  
- **Edge–Cloud Integration:** Runs edge and cloud inference nodes through REST endpoints.  
- **Interactive Dashboard:** Explore the model behavior live — upload an image and instantly view predictions, confidence, and latency at each exit. Use dropdowns to dynamically change confidence thresholds, branch counts, datasets, and training strategies, and watch the charts update in real time to reveal accuracy–latency trade-offs.
- **Inference Analysis :** Explore threshold  trade-offs for accuracy vs. inference time.  
- **Training Strategy Explorer:** Compare Base, Joint, Layered, and Separate training performance.  
- **Built-in Configuration:** All URLs, ports, dataset paths, and model settings are defined in `config.py`.  
- **Dynamic Visualization:** Interactive analytics powered by **Chart.js** and **D3.js**.

---

## 🧱 Tech Stack
**Backend:** Python · Flask  
**Frontend:** HTML · Bootstrap · Chart.js · D3.js  
**Models:** MobileNetV2, VGG16, ResNet50 (Early-Exit variants)  
**Datasets:** Caltech-256 · CIFAR-10 · CIFAR-100  
**Deployment:** Edge + Cloud via Flask REST APIs  

---

## 🙌 Acknowledgment
Core early-exit implementation adapted from [pachecobeto95](https://github.com/pachecobeto95)  
and extended into a complete **edge–cloud interactive Flask dashboard**.

---

## ⚙️ Quick Start

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/EEDNN-EdgeCloud.git
cd EEDNN-EdgeCloud
````

### 2️⃣ Create and activate a virtual environment

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 3️⃣ Run the Flask application

Simply execute:

```bash
python edgeWebAPI.py
```

All host, port, and path settings are loaded automatically from **`config.py`**.

By default, the app runs on:
👉 **[http://localhost:5000](http://localhost:5000)**

(If you also wish to start the cloud node, run the equivalent file for cloud setup.)

---

## 🧭 Dashboard Modules

| Module                      | Description                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------- |
| 🖼️ **Image Recognition**   | Displays per-exit predictions, confidence scores, and total latency.                  |
| 📊 **Inference Analysis**   | Interactive analysis of threshold vs. accuracy vs. latency). |
| ⚙️ **Training Analysis**    | Visualizes accuracy and training time across different training strategies.           |
| ☁️ **Edge–Cloud Execution** | Demonstrates adaptive inference routing between edge and cloud services.              |

---

## 🧠 Research Context

This project extends the ICDAM 2022 early-exit study into a **deployable edge–cloud system** using Flask.
It enables real-time visualization of the accuracy–latency trade-off, making it an ideal platform for understanding adaptive, efficient inference pipelines in deep learning systems.

---

## 🎬 Demo Preview

<video src="https://github.com/<your-username>/EEDNN-EdgeCloud/assets/12345678/demo.mp4" width="800" controls>
Your browser does not support the video tag.
</video>

Explore the interactive dashboard in action — upload images, adjust thresholds, branches, and datasets, and observe the real-time accuracy–latency trade-offs across edge and cloud inference.

---


**Inference Analysis - Citation**

```
Haseena Rahmath P., Vishal Srivastava, and Kuldeep Chaurasia.
"A Strategy to Accelerate the Inference of a Complex Deep Neural Network."
Proceedings of Data Analytics and Management (ICDAM 2022), Springer Nature Singapore, pp. 57–68.
DOI: 10.1007/978-981-19-7615-5_5
```


