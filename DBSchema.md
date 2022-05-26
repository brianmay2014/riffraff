Code sample from debonairbnb




Table users 
{
  id int [pk, increment]
  firstName varchar
  lastname varchar
  userName varchar
  email varchar
  hashedPassword varchar
  bio varchar
}

Table estates 
{
  id int [pk, increment]
  ownerId int
  title varchar
  description varchar
  type int
  address varchar
  city varchar
  state varchar
  zipcode int
  nightlyRate int
}

Table critiques 
{
  id int [pk, increment]
  userId int
  estateId int
  rating int
  comment varchar
}

Table charters 
{
  id int [pk, increment]
  estateId int
  userId int
  guestNum int
  startDate date
  endDate date
}

Table estateImages 
{
  id int [pk, increment]
  estateId int
  url varchar
  title varchar
}

Table favoritedEstates 
{
  userId int
  estateId int
}

Table messages {
  id int [pk, increment]
  senderId int
  recipientId int
  content text
  seen boolean
}

Table estateTypes {
  id int [pk, increment]
  name varchar
}

Ref: estates.id < estateImages.estateId

Ref: users.id < estates.ownerId

Ref: estates.id < charters.estateId

Ref: estateTypes.id < estates.type

Ref: users.id < charters.userId

Ref: users.id < favoritedEstates.userId

Ref: estates.id < favoritedEstates.estateId

Ref: users.id < critiques.userId

Ref: estates.id < critiques.estateId

Ref:  users.id < messages.senderId

Ref: users.id < messages.recipientId