FROM mongo
WORKDIR /mongoDb
COPY ./backup_db ./backup_db
EXPOSE 27017
# CMD ["mongorestore", "backup_db"]
CMD ["sh", "-c", "sleep 5 && mongorestore /mongoDb/backup_db"]