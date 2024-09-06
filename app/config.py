# @Author : 高天齐
# @Time   : 2024/9/6 23:09
# @File   : app/config.py
# @Note   : 数据库管理配置


class Config:
    SECRET_KEY = "your_secret_key"
    SQLALCHEMY_DATABASE_URI = "sqlite:///your_database.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
