
# Small Restaurant

This is a task for Qurba, A small Restaurant app which contains two models users and restaurants.
Every restaurant has name, cuisine, location and owner.

Every user has a username and favoriteCuisines.


## API Reference

### user
#### Create a user

```http
  POST /user/user/
```

#### Get users

```http
  GET /user/user/
```
| Query params    | Description                |
| :--------  | :------------------------- |
| `favoriteCuisine`  | **Optional**. favorite cuisine |
| `username`  | **Optional**. find specific username |

Here you can pass favoriteCuisine as Query params to get all users with that value part of their Favorite Cuisines
or owns a restaurant with the same cuisine

#### Find a specific user
```http
  GET /user/user/${id}
```

#### Add new favorite cuisine
```http
  POST /user/user/${id}
```
with body 

    "cuisine":<cuisine>

### Restaurant

#### Get restaurants
```http
  GET /user/restaurant
```

| Query params    | Description                |
| :--------  | :------------------------- |
| `name`  | **Optional**. restaurant name |
| `cuisine`  | **Optional**. cuisine |

#### Get restaurant

```http
  GET /user/restaurant/${id}
```

#### Get restaurants within distance.

```http
  GET /user/restaurant/findWithin
```
with body 

    "restaurant":{
        "location":{
            "long":<long>,
            "latt":<latt>
        },
        "maxDistance":<distance>
        
    }

#### Create a restaurant
```http
  POST /user/restaurant/
```
    "restaurant":{
            "name":<name>,
            "cuisine":<cuisine>,
            "location":{
                "type":"Point",
                "coordinates":[<long>,<latt>]
            },
            "owner":"nasr"
    }

#### Delete restaurant
```http
  DELETE /user/restaurant/${id}
```
