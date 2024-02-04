function SetCalendar() {
  //Получаем объект страницы
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadSheet.getActiveSheet();
  
  //Индексы первой строки и первого столбца в таблице с данными
  const rowStart = 2;
  const colStart = 1;

  //Количество строк и столбцов в плане
  const colsCount = 4;
  const rowsCount = sheet.getLastRow();  

  //Извлекаем данные таблицы в указанных диапазонах
  var range = sheet.getRange(rowStart, colStart, rowsCount, colsCount)
  var data = range.getDisplayValues();

  //Константы-имена для индексов столбцов
  const nameCol = 0;
  const dateCol = 1;
  const timeCol = 2;
  const infoCol = 3;

  for (var i in data)
  {
    let row = data[i];

    let trainingName = row[nameCol];
    let trainingDate = row[dateCol];
    let trainingTime = row[timeCol];
    let trainingInfo = row[infoCol];

    Logger.log("[NAME] " + trainingName);
    Logger.log("[DATE] " + trainingDate);
    Logger.log("[TIME] " + trainingTime);
    Logger.log("[INFO] " + trainingInfo);
    Logger.log("============================================");

    var event = CalendarApp.getDefaultCalendar().createAllDayEvent(trainingName, new Date(trainingDate));
    event.setDescription(trainingInfo)

    Utilities.sleep(50);
