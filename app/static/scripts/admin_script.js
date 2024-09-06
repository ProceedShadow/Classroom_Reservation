function showTool(tool) {
  var toolTitle = document.getElementById('toolTitle');
  var toolDescription = document.getElementById('toolDescription');

  if (tool === 'programmeAudit') {
    toolTitle.innerText = '工具1';
    toolDescription.innerText = '这是工具1的详细信息。';
  } else if (tool === 'userAdministrate') {
    toolTitle.innerText = '工具2';
    toolDescription.innerText = '这是工具2的详细信息。';
  } else if (tool === 'roomAdministrate') {
    toolTitle.innerText = '工具3';
    toolDescription.innerText = '这是工具3的详细信息。';
  } else if (tool === 'Others') {
    toolTitle.innerText = '';
    toolDescription.innerText = ''
  }
}

