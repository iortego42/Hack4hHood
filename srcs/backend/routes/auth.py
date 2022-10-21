from flask import request
from sqlalchemy.orm import Session
from sqlalchemy import select

class Auth:
	def __init__(self, engine):
		self.engine = engine
	
	def auth(self):
		data = request.json

		with Session(engine) as session:
			statement = select(User.name, User.fullname)
			rows = session.execute(statement).one()

		token = jwt.encode({"some": "payload"}, "secret", algorithm="HS256")
		print(token)