# @Author : 高天齐
# @Time   : 2024/9/6 23:09
# @File   : app/forms.py
# @Note   : 表单处理


from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length


class LoginForm(FlaskForm):
    # 信息1: 用户名字段，要求必填，长度介于 4 到 20 之间
    name = StringField("姓名", validators=[DataRequired(), Length(min=5, max=9)])

    # 信息2: 管理员标识，使用普通文本输入框，但没有验证器
    username = StringField("账号")

    # 信息3: 密码字段，要求必填
    password = PasswordField("密码", validators=[DataRequired()])

    # 登录按钮
    submit = SubmitField("登录")
