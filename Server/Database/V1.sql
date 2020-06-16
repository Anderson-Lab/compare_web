drop database if exists compare_web;
create database compare_web;
use compare_web;

create table Files(
   fileName1 varchar(100) NOT NULL,
   fileName2 varchar(100) NOT NULL,
   targetName varchar(100) NOT NULL,
   isLoading boolean NOT NULL,
   type1 varchar(100) NOT NULL,
   type2 varchar(100) NOT NULL,
   size1 int(11) NOT NULL,
   size2 int(11) NOT NULL,
   new_name1 varchar(100) NOT NULL,
   new_name2 varchar(100) NOT NULL,
   id varchar(200) PRIMARY KEY NOT NULL,
   results_file varchar(200) NOT NULL
);
