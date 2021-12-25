# CS3219 OTOT Task A1

## Steps to reproduce
1. Clone the repository: <br>
   ```sh
   git clone https://github.com/MarcusTw/CS3219_Task_A1.git
   ```
2. Build the image using Dockerfile: <br>
   ```sh 
   docker build -t cs3219_taska1 .
   ```
3. Run the container: <br> 
   ```sh 
   docker run -p 80:80 -d --name nginx_reverse_proxy cs3219_taska1
   ```

### View the index.html I've written in [localhost](http://localhost/)
