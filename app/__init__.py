# @Author : 高天齐
# @Time   : 2024/9/6 23:09
# @File   : app/__init__.py
# @Note   : 初始化flask APP

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect

# 初始化扩展
db = SQLAlchemy()
migrate = Migrate()
csrf = CSRFProtect()


def create_app() -> Flask:
    """
    搭建网页APP框架。
    :return ：Flask对象
    """
    app = Flask(__name__)

    # 加载配置
    app.config.from_object("app.config.Config")

    # 初始化扩展
    db.init_app(app)
    migrate.init_app(app, db)
    csrf.init_app(app)  # 在 app 初始化后，初始化 CSRF 保护

    # 注册路由
    # NOTE: 这里没有在开头导入app.routes的原因：避免<循环导入>错误
    from app.routes import main as main_blueprint

    app.register_blueprint(main_blueprint)

    return app
