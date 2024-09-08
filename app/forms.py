# @Author : 高天齐
# @Time   : 2024/9/6 23:09
# @File   : app/forms.py
# @Note   : 表单处理


from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length


class LoginForm(FlaskForm):
    # 信息1: 用户名字段，要求必填，长度介于 2 到 10 之间
    name = StringField("姓名", validators=[DataRequired(), Length(min=2, max=10)])

    # 信息2: 管理员标识，使用普通文本输入框，但没有验证器
    username = StringField("账号", validators=[DataRequired(), Length(min=5, max=10)])

    # 信息3: 密码字段，要求必填
    password = PasswordField("密码", validators=[DataRequired()])

    # 登录按钮
    submit = SubmitField("登录")


class ApplicateForm(FlaskForm):
    classroom = SelectField("预约教室", choices=[], validators=DataRequired())

    reason = StringField("申请理由", validators=DataRequired())

    submit = SubmitField("提交申请")
