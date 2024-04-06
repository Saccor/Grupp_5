import pytest
from mongodb_api import find_one, insert_one, update_one, delete_one

collection_name = "testCollection"

def test_insert_one():
    new_document = {
        "name": "Test Product",
        "price": 9.99,
        "description": "This is a test product.",
        "inStock": True
    }
    response = insert_one(collection_name, new_document)
    assert response['insertedId'] is not None

def test_find_one():
    response = find_one(collection_name, {"name": "Test Product"})
    assert response['document']['name'] == "Test Product"

def test_update_one():
    update_filter = {"name": "Test Product"}
    update_action = {"$set": {"price": 19.99}}
    response = update_one(collection_name, update_filter, update_action)
    assert response['modifiedCount'] == 1

def test_delete_one():
    delete_filter = {"name": "Test Product"}
    response = delete_one(collection_name, delete_filter)
    assert response['deletedCount'] == 1

