(() => {
  const $expandedFolders = document.querySelectorAll(
    '.jqueryFileTree .directory.template-folder.expanded'
  );
  if ($expandedFolders.length <= 0) throw 'There is no folder opened';

  for (const $expandedFolder of $expandedFolders) {
    const $anchor = $expandedFolder.querySelector('a');
    if ($anchor === null) throw 'Anchor element not found';

    const folderName = $anchor.text;
    if (folderName.length <= 0) throw 'Invalid folder name';

    const $templates = $expandedFolder.querySelectorAll(
      '.jqueryFileTree .file.template:not(.file.add)'
    );
    if ($templates.length <= 0) return;

    for (const $template of $templates) {
      const $link = $template.querySelector('a');
      if ($link === null) throw 'Anchor element not found';

      const fileName = $link.text;
      const saveTemplate = setTimeout(() => {
        $link.click();

        fetch(`http://localhost:3001`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            folderName: folderName,
            fileName: fileName,
            content: `<p>Teste</p>`,
          }),
        });
      }, 200);
    }
  }
})();
