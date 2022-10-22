from flask import Flask
from flask import Flask, Response, jsonify
from flask_cors import CORS
from models import Base

from sqlalchemy import create_engine, update
from sqlalchemy.orm import Session
from sqlalchemy import select

from routes.user import User
from routes.offer import Offer
from routes.auth import Auth
from routes.tag import Tag
from routes.location import Location

class Server:
	def __init__(self) -> None:
		self.app = Flask(__name__)
		CORS(self.app)
		self.engine = create_engine("mysql+mysqldb://topo:&CbGsI1!PHFXgCX642z7!wbMH@database/hack4good")
		Base.metadata.create_all(self.engine)
		self.user_routes = User(self.engine)
		self.offer_routes = Offer(self.engine)
		self.auth_routes = Auth(self.engine)
		self.tag_routes = Tag(self.engine)
		self.location_routes = Location(self.engine)
		self.define_user_routes()
		self.define_offer_routes()
		self.define_auth_routes()
		self.define_tag_routes()
		self.define_location_routes()

	def define_auth_routes(self):
		self.app.add_url_rule("/auth", view_func=self.auth_routes.auth, methods=["POST"])

	def define_user_routes(self):
		self.app.add_url_rule("/user", view_func=self.user_routes.get_all_users, methods=["GET"])
		self.app.add_url_rule("/user", view_func=self.user_routes.create_user, methods=["POST"])
		self.app.add_url_rule("/user/<id>", view_func=self.user_routes.get_user, methods=["GET"])
		self.app.add_url_rule("/user/<id>", view_func=self.user_routes.update_user, methods=["PATCH"])

	def define_offer_routes(self):
		self.app.add_url_rule("/offer", view_func=self.offer_routes.get_all_offers, methods=["GET"])
		self.app.add_url_rule("/offer", view_func=self.offer_routes.create_offer, methods=["POST"])
		self.app.add_url_rule("/offer/<id>", view_func=self.offer_routes.get_offer, methods=["GET"])
		self.app.add_url_rule("/offer/<id>", view_func=self.offer_routes.update_offer, methods=["PATCH"])

	def define_tag_routes(self):
		self.app.add_url_rule("/tag", view_func=self.tag_routes.create_tag, methods=["POST"])
		self.app.add_url_rule("/tag/<id>", view_func=self.tag_routes.get_tag, methods=["GET"])
		self.app.add_url_rule("/tag", view_func=self.tag_routes.get_all_tags, methods=["GET"])

	def define_location_routes(self):
		self.app.add_url_rule("/location", view_func=self.location_routes.create_location, methods=["POST"])
		self.app.add_url_rule("/location/<id>", view_func=self.location_routes.get_location, methods=["GET"])
		self.app.add_url_rule("/location", view_func=self.location_routes.get_all_locations, methods=["GET"])
		

if __name__ == "__main__":
	server: Server = Server()
	server.app.run(host="0.0.0.0", port=3000)
