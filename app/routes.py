# @Author : 高天齐
# @Time   : 2024/9/6 23:09
# @File   : app/routes.py
# @Note   : 路由配置与分发


from flask import Blueprint, render_template, redirect, url_for, session
from app.forms import LoginForm

main = Blueprint("main", __name__)


@main.route("/", methods=["GET"])
@main.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()  # 创建表单实例
    if form.validate_on_submit():
        # 获取表单数据
        name = form.name.data
        username = form.username.data
        password = form.password.data

        # 将信息保存到 session 中
        session["name"] = name
        session["username"] = username
        session["password"] = password

        # TODO: 需要验证用户名是否存在，密码是否正确。

        # 判断是否为管理员
        if username == "admin":
            return redirect(url_for("main.admin_dashboard"))
        else:
            return redirect(url_for("main.user_dashboard"))

    return render_template("login.html", form=form)  # 确保将 form 传递给模板


@main.route("/user_dashboard")
def user_dashboard():
    # 从 session 中获取信息
    name = session.get("name")
    username = session.get("username")
    password = session.get("password")

    # 检查是否有数据，避免未登录时访问
    if not name or not username or not password:
        return redirect(url_for("main.login"))

    return render_template("user.html", name=name, username=username, password=password)


@main.route("/admin_dashboard")
def admin_dashboard():
    # 从 session 中获取信息
    name = session.get("name")
    username = session.get("username")
    password = session.get("password")

    # 检查是否有数据，避免未登录时访问
    if not name or not username or not password:
        return redirect(url_for("main.login"))

    return render_template(
        "admin.html", name=name, username=username, password=password
    )
