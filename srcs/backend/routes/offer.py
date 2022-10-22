import json
from sqlalchemy.orm import Session
from sqlalchemy import select
from flask import jsonify
from models import OfferModel
from flask import request

class Offer:
	def __init__(self, engine):
		self.engine = engine

	# /offer/
	def get_all_offers(self):
		with Session(self.engine) as session:
			statement = select(OfferModel.id, OfferModel.title, OfferModel.description, OfferModel.creation_date, OfferModel.user_id, OfferModel.tag_id, OfferModel.location_id)
			result = session.execute(statement)
			if result == None:
				return jsonify({"error": "None offers exists"}), 403
			offers = []
			for r in result:
				print(r)
				row = {
					"id": result.id,
					"title": result.title,
					"description": result.description,
					"creation_date": result.creation_date,
					"user_id": result.user_id,
					"tag_id": result.tag_id,
					"location_id": result.location_id
				}
				offers.append(row)

			return jsonify(offers), 200
		

	# /offer/
	def create_offer(self):
		data = request.json
		offer = OfferModel(
			title = data["title"],
			description = data["description"],
			tag_id = data["tag_id"],
			user_id = data["user_id"],
			location_id = data["location_id"]
		)

		with Session(self.engine) as session:
			session.add(offer)
			session.commit()
			return jsonify({}), 200

	# /offer/<id>
	def get_offer(self, id):
		with Session(self.engine) as session:
			statement = select(OfferModel.id, OfferModel.title, OfferModel.description, OfferModel.creation_date, OfferModel.user_id, OfferModel.tag_id, OfferModel.location_id).where(OfferModel.id == id)
			result = session.execute(statement).fetchone()
			if result == None:
				return jsonify({"error": "None offer exists with the provided ID."}), 403
			row = {
				"id": result.id,
				"title": result.title,
				"description": result.description,
				"creation_date": result.creation_date,
				"user_id": result.user_id,
				"tag_id": result.tag_id,
				"location_id": result.location_id
			}
			return jsonify(row), 200

	# /offer/<id>
	def update_offer(self, id):
		return "Hola"
