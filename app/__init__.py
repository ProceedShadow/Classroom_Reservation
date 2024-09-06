from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect

# 初始化扩展
db = SQLAlchemy()
migrate = Migrate()
csrf = CSRFProtect()


def create_app():
    app = Flask(__name__)

    # 加载配置
    app.config.from_object("app.config.Config")

    # 初始化扩展
    db.init_app(app)
    migrate.init_app(app, db)
    csrf.init_app(app)  # 在 app 初始化后，初始化 CSRF 保护

    # 注册路由
    from app.routes import main as main_blueprint

    app.register_blueprint(main_blueprint)

    return app
