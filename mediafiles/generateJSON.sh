#!/usr/bin/env bash

echo 'ObjPL='

echo '[{ 
    "uuid": "'$(uuidgen)'",
    "src": "image3.jpg", 
    "mime": "image/jpeg", 
    "when":  new Date(new Date().addMilisecons(0)).toISOString(), 
    "where": "box" 
  }'

for i in {1..100}   # you can also use {0..9}
do
  j=$(expr ${i} '*' 6000)
  echo ',{ 
    "uuid": "'$(uuidgen)'",
    "src": "image3.jpg", 
    "mime": "image/jpeg", 
    "when":  new Date(new Date().addMilisecons('${j}')).toISOString(), 
    "where": "box" 
  }' 
  echo ',{ 
    "uuid": "'$(uuidgen)'",
    "src": "CountDown10s.mp4", 
    "mime": "video/mp4", 
    "when":  new Date(new Date().addMilisecons('${j}'+3000)).toISOString(), 
    "where": "box" 
  }' 
done

echo '];'

# var_date=$(date)

# x=1
# while [ $x -le 50 ]
# do
#   var_date=$(date -d "${var_date} + 10 seconds") 
#   echo "${var_date}";../media/Amazon3.jpg
#   var_date=$(date -d "${var_date} + 10 seconds" ) 
#   echo "${var_date}";../media/Runners-8153.mp4
#   var_date=$(date -d "${var_date} + 10 seconds") 
#   echo "${var_date}";../media/E56DAA3C-E756-4EF8-C06E-E989C47E827E.mp4		
#   var_date=$(date -d "${var_date} + 10 seconds") 
#   echo "${var_date}";../media/4.jpg
#   x=$(( $x + 1 ))
# done