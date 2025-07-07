import requests

url = "http://localhost:8000/api/claims/voice/"
headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUxODQ2NDkwLCJpYXQiOjE3NTE4NDYxOTAsImp0aSI6ImU3ZGM2ZmMyODgyYjQwYmU4OTQ0M2VkYTJkYzE1ODFlIiwidXNlcl9pZCI6Mn0.CO5hjiUyIku2bMeIy4L-FWjGBxpmeonZ5-_rdexCKBo'
}
files = {
    'audio': open('voice_memo.mp3', 'rb')  # make sure this file exists
}

response = requests.post(url, files=files, headers=headers)
print(response.status_code)
print(response.json())
