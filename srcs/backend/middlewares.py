from flask import request
from flask import jsonify
import jwt

def auth_check():
	auth_header = request.headers.get("Authorization")

	if auth_header == None:
		return False

	print(auth_header)

	try:
		decoded_token = jwt.decode(auth_header, "secret", algorithms="HS256")
	except:
		return False

	return True