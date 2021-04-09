# Salaryfy API REST

This is an api that uses salaryfy client.

## Version: 1.0.0

**Contact information:**  
jonathanmejia.ar@gmail.com

### /register

#### POST

##### Summary

Register user

##### Responses

| Code | Description                                |
| ---- | ------------------------------------------ |
| 200  | OK                                         |
| 400  | Bad Request                                |
| 409  | Conflict, username or email already exists |

### /login

#### POST

##### Summary

Login user

##### Responses

| Code | Description                                  |
| ---- | -------------------------------------------- |
| 200  | OK                                           |
| 401  | Unauthorized, username or password incorrect |
| 500  | Server Internal Error                        |

### /jobs/completed

#### GET

##### Summary

Get completed jobs

##### Description

Get a list of all completed jobs

##### Responses

| Code | Description           |
| ---- | --------------------- |
| 200  | OK                    |
| 500  | Server Internal Error |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### /jobs/complete/{jobId}

#### PUT

##### Summary

Complete a job

##### Description

Use to change completed state of a job

##### Parameters

| Name  | Located in | Description | Required | Schema  |
| ----- | ---------- | ----------- | -------- | ------- |
| jobId | path       |             | Yes      | integer |

##### Responses

| Code | Description           |
| ---- | --------------------- |
| 200  | OK                    |
| 404  | Not found             |
| 500  | Server Internal Error |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### /jobs

#### GET

##### Summary

Get incompleted jobs

##### Description

Get a list of all incompleted jobs

##### Responses

| Code | Description           |
| ---- | --------------------- |
| 200  | OK                    |
| 500  | Server Internal Error |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

#### POST

##### Summary

Create job

##### Responses

| Code | Description                                          |
| ---- | ---------------------------------------------------- |
| 200  | OK                                                   |
| 422  | Unprocessable Entity, didn't pass the job validation |
| 500  | Server Internal Error                                |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### /jobs/{jobId}

#### GET

##### Summary

Get a job

##### Description

Use to get a single job

##### Parameters

| Name  | Located in | Description | Required | Schema  |
| ----- | ---------- | ----------- | -------- | ------- |
| jobId | path       |             | Yes      | integer |

##### Responses

| Code | Description           |
| ---- | --------------------- |
| 200  | OK                    |
| 404  | Not Found             |
| 500  | Server Internal Error |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

#### PUT

##### Summary

Update a job

##### Parameters

| Name  | Located in | Description | Required | Schema  |
| ----- | ---------- | ----------- | -------- | ------- |
| jobId | path       |             | Yes      | integer |

##### Responses

| Code | Description           |
| ---- | --------------------- |
| 200  | OK                    |
| 404  | Not Found             |
| 500  | Server Internal Error |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

#### DELETE

##### Summary

Delete a job

##### Parameters

| Name  | Located in | Description | Required | Schema  |
| ----- | ---------- | ----------- | -------- | ------- |
| jobId | path       |             | Yes      | integer |

##### Responses

| Code | Description           |
| ---- | --------------------- |
| 200  | OK                    |
| 404  | Not Found             |
| 500  | Server Internal Error |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| bearerAuth      |        |

### Models

#### UserRegister

| Name     | Type   | Description                        | Required |
| -------- | ------ | ---------------------------------- | -------- |
| username | string | _Example:_ `"fakeuser"`            | Yes      |
| email    | string | _Example:_ `"fakeemail@gmail.com"` | Yes      |
| password | string | _Example:_ `"fakepass123"`         | Yes      |

#### UserLogin

| Name     | Type   | Description                | Required |
| -------- | ------ | -------------------------- | -------- |
| username | string | _Example:_ `"fakeuser"`    | Yes      |
| password | string | _Example:_ `"fakepass123"` | Yes      |

#### Job

| Name         | Type       | Description              | Required |
| ------------ | ---------- | ------------------------ | -------- |
| name         | string     | _Example:_ `"Ecommerce"` | Yes      |
| client       | string     | _Example:_ `"Nike"`      | Yes      |
| pricePerHour | integer    | _Example:_ `45`          | Yes      |
| technologies | [ string ] |                          | Yes      |
