from datetime import datetime, timedelta

from sqlalchemy import Column, ForeignKey, String, Integer, DateTime
from sqlalchemy.orm import backref, declarative_base, relationship

Base = declarative_base()

class UserModel(Base):
	__tablename__ = "users"

	id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
	name = Column(String(16))
	last_name = Column(String(16))
	email = Column(String(255), unique=True)
	phone = Column(String(16))
	creation_date = Column(DateTime, default=(datetime.utcnow()))
	password = Column(String(1024))
 
	def __repr__(self) -> str:
		return f"User<id: {self.id}, name: {self.name}, last_name: {self.last_name}, email: {self.email}, phone: {self.phone}, creation_date: {self.creation_date}>"

class OfferModel(Base):
	__tablename__ = "offers"

	id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
	title = Column(String(255))
	description = Column(String(2048))
	creation_date = Column(DateTime, default=(datetime.utcnow()), index=True)
	user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
	tag_id = Column(Integer, ForeignKey("tags.id"), nullable=False)
	location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)

	tag = relationship("TagModel")
	location = relationship("LocationModel")

class LocationModel(Base):
	__tablename__ = "locations"

	id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
	name = Column(String(255))

class TagModel(Base):
	__tablename__ = "tags"

	id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
	name = Column(String(255))