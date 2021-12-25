# CS3219_TaskF

## Steps to reproduce
1. Clone the repository: <br>
   ```sh
   git clone https://github.com/MarcusTw/CS3219_Task_F.git
   ```
2. Create a dotenv file named `.env`. Add your custom `PORT` number and database link `MONGODB_URL`: <br>
   Add this `.env` file in root directory and data directory.
3. Install required dependencies: <br> 
   ```sh 
   npm install
   ```
4. Populate your database
   ```sh
   cd data
   node populate.js
   ```
5. Start redis-server
   ```sh 
   redis-server
   ```
6. Run the app
   ```sh 
   npm start
   ```
6. Boot up PostMan, call: <br>
   GET to [`localhost:9000/api/users`](http://localhost:9000/api/users) <br>
   GET to [`localhost:9000/api/users/Clarabelle`](http://localhost:9000/api/users/Clarabelle) <br>
   Notice that on the second attempt onwards, both HTTP GET calls are significantly faster due to caching.
