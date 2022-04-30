1. Активируй виртуальное окружение venv\Scripts\activate.bat
2. Установи бибилиотеки pip install -r requirements.txt
3. Создай файл без названия с расширением .env  
   Пример ".env"  
   Добавь туда значения из шаблона "template.env",
   лежит в папке HR_portal и заполни значениям для подключения к бд
   
4. Примени миграции командой python manage.py migrate
5. Запускай сервер командой python manage.py runserver