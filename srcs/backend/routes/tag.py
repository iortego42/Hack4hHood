import json
from sqlalchemy.orm import Session
from sqlalchemy import select
from flask import jsonify
from models import TagModel
from flask import request
from middlewares import auth_check

class Tag:
	def __init__(self, engine):
		self.engine = engine

	# /tag/
	def get_all_tags(self):
		with Session(self.engine) as session:
			statement = select(TagModel.id, TagModel.name)
			result = session.execute(statement)
			if result == None:
				return jsonify({"error": "None tag exists"}), 403
			tags = []
			for r in result:
				row = {
					"id": r.id,
					"name": r.name
				}
				tags.append(row)

			return jsonify(tags), 200

	# /tag/
	def create_tag(self):
		auth = auth_check()
		if auth == None:
			return jsonify({}), 401

		data = request.json
		tag = TagModel(
			name = data["name"]
		)

		with Session(self.engine) as session:
			statement = select(TagModel.id, TagModel.name).where(TagModel.name == data["name"])
			rows = session.execute(statement).fetchone()
			if rows != None:
				return jsonify({"error": "Tag already exists."}), 403
			session.add(tag)
			session.commit()
			return jsonify({}), 200

	# /tag/<id>
	def get_tag(self, id):
		with Session(self.engine) as session:
			statement = select(TagModel.id, TagModel.name).where(TagModel.id == id)
			result = session.execute(statement).fetchone()
			if result == None:
				return jsonify({"error": "None tag exists with the provided ID."}), 403
			row = {
				"id": result.id,
				"name": result.name
			}
			return jsonify(row), 200