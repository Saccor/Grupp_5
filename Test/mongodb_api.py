import requests


url = "https://eu-central-1.aws.data.mongodb-api.com/app/data-thgwp/endpoint/data/v1/action/"
headers = {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key": "buuDPH5UrahScGF9qeNVwwjHb4emFRQIpx4nBwlU8Eq1bcU8iMI0kMgOVS5E4IED"
}

database = "mehmet"
dataSource = "webbshop"


def find_one(collection, filter):
    full_url = f"{url}findOne"
    payload = {
        "collection": collection,
        "database": database,
        "dataSource": dataSource,
        "filter": filter
    }
    response = requests.post(full_url, json=payload, headers=headers)
    return response.json()


def insert_one(collection, document):
    full_url = f"{url}insertOne"
    payload = {
        "collection": collection,
        "database": database,
        "dataSource": dataSource,
        "document": document
    }
    response = requests.post(full_url, json=payload, headers=headers)
    return response.json()


def update_one(collection, filter, update):
    full_url = f"{url}updateOne"
    payload = {
        "collection": collection,
        "database": database,
        "dataSource": dataSource,
        "filter": filter,
        "update": update
    }
    response = requests.post(full_url, json=payload, headers=headers)
    return response.json()


def delete_one(collection, filter):
    full_url = f"{url}deleteOne"
    payload = {
        "collection": collection,
        "database": database,
        "dataSource": dataSource,
        "filter": filter
    }
    response = requests.post(full_url, json=payload, headers=headers)
    return response.json()

# Example Usages
# Finding products
print(find_one("products", {"name": "X"}))

# Add product
new_product = {
    "name": "Banana",
    "price": 2.99,
    "description": "Fresh organic bananas.",
    "inStock": True
}
print(insert_one("products", new_product))

# Product update
update_filter = {"name": "Banana"}
update_action = {"$set": {"price": 3.49}}
print(update_one("products", update_filter, update_action))

# Delete product
delete_filter = {"name": "Banana"}
print(delete_one("products", delete_filter))
