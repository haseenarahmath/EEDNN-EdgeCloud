from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from appEdge import login


class User(UserMixin):
    id = "123"
    username = "Haseena"
    email = "haseena@gmail.com"
    password_hash = generate_password_hash("123")
    """is_active =True

    def get_id(id=123):
        return User()
    """
    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


@login.user_loader
def load_user(id):
    x=User()
    print("**************:",x)
    return User()
