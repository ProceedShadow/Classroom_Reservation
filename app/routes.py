from flask import Blueprint, render_template, redirect, url_for, session, request

main = Blueprint("main", __name__)


@main.route("/")
def index():
    return render_template("login.html")


@main.route("/login", methods=["POST"])
def login():
    # 假设从表单获取信息1、信息2、信息3
    info1 = request.form.get("info1")
    info2 = request.form.get("info2")
    info3 = request.form.get("info3")

    # 将信息保存到 session 中
    session["info1"] = info1
    session["info2"] = info2
    session["info3"] = info3

    # 判断是否为管理员
    if info2 == "admin":
        return redirect(url_for("main.admin_dashboard"))
    return redirect(url_for("main.user_dashboard"))


@main.route("/user_dashboard")
def user_dashboard():
    info1 = session.get("info1")
    info2 = session.get("info2")
    info3 = session.get("info3")
    return render_template("user_dashboard.html", info1=info1, info2=info2, info3=info3)


@main.route("/admin_dashboard")
def admin_dashboard():
    return render_template("admin_dashboard.html")
