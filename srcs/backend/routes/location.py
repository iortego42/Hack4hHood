import json
from sqlalchemy.orm import Session
from sqlalchemy import select
from flask import jsonify
from models import LocationModel
from flask import request
from middlewares import auth_check

class Location:
	def __init__(self, engine):
		self.engine = engine

	# /location
	def get_all_locations(self):
		with Session(self.engine) as session:
			statement = select(LocationModel.id, LocationModel.name)
			result = session.execute(statement)
			if result == None:
				return jsonify({"error": "None location exists"}), 403
			locations = []
			for r in result:
				row = {
					"id": r.id,
					"name": r.name
				}
				locations.append(row)

			return jsonify(locations), 200

	# /location
	def create_location(self):
		auth = auth_check()
		if auth == None:
			return jsonify({}), 401

		data = request.json
		location = LocationModel(
			name = data["name"]
		)

		with Session(self.engine) as session:
			statement = select(LocationModel.id, LocationModel.name).where(LocationModel.name == data["name"])
			rows = session.execute(statement).fetchone()
			if rows != None:
				return jsonify({"error": "Location already exists."}), 403
			session.add(location)
			session.commit()
			return jsonify({}), 200

	# /location/<id>
	def get_location(self, id):
		with Session(self.engine) as session:
			statement = select(LocationModel.id, LocationModel.name).where(LocationModel.id == id)
			result = session.execute(statement).fetchone()
			if result == None:
				return jsonify({"error": "None location exists with the provided ID."}), 403
			row = {
				"id": result.id,
				"name": result.name
			}
			return jsonify(row), 200