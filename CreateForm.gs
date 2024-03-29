function createForm() {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadSheet.getSheetByName("Лист1");
    var lastrow = sheet.getLastRow();

// создание формы

  for (var i = 2; i <= lastrow; i++) {
    var nameGroup = sheet.getRange(i,2).getValue();
    Logger.log(nameGroup);
    if (nameGroup != "") {
      var form = FormApp.create("Мониторинг качества образования").setTitle(nameGroup);
      form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadSheet.getId())

// создание вопросов

      var checkFirstColumn = "";
      var j = i;
      while ((checkFirstColumn == nameGroup || checkFirstColumn == "") && j <= lastrow) {
        
        var names = new Set() //уникальный набор всех имён преподавателей
        var nameSubject = sheet.getRange(j, 3).getValue();  //nameSubject - название предмета
        var nameLecturer = sheet.getRange(j, 4).getValue().split("\n"); //nameLecturer - имя лектора
        for(let str1 of nameLecturer) {
          names.add(str1)
        }
        var nameSeminarist = sheet.getRange(j, 5).getValue().split("\n"); //nameSeminarist - имя семинариста
        for(let str2 of nameSeminarist) {
          names.add(str2)
        }

// Создаем объект-итератор, содержащий все записи (значения)
        var namesValues = names.values()
// Перебираем объект-итератор namesEntries
// и выводим все значения одно за другим
        for (var name of namesValues) {
          Logger.log(nameSubject + ", " + name);
          var item = form.addGridItem();
          item.setTitle(nameSubject + ", " + name)
            .setRows(['Качество преподавания', 'Организация учебного процесса', 'Техническое сопровождение учебного процесса'])
            .setColumns(['1', '2', '3', '4', '5']);
        }
        j = j + 1;
        checkFirstColumn = sheet.getRange(j, 2).getValue()
      }
    } 
  } 
}
