const $expandedFolders = document.querySelectorAll(
  '.jqueryFileTree .directory.template-folder.expanded'
);

if ($expandedFolders.length > 0) {
  for (const $expandedFolder of $expandedFolders) {
    const $anchor = $expandedFolder.querySelector('a');

    if ($anchor !== null) {
      const folderName = $anchor.text;

      if (folderName.length > 0) {
        const $templates = $expandedFolder.querySelectorAll(
          '.jqueryFileTree .file.template:not(.file.add)'
        );

        if ($templates.length > 0) {
          for (const $template of $templates) {
            const $link = $template.querySelector('a');

            if ($link !== null) {
              const saveTemplate = setTimeout(() => {
                $link.click();
              }, 200);
            }
          }
        }
      } else {
        throw 'Invalid folder name';
      }
    } else {
      throw 'Anchor element not found';
    }
  }
} else {
  throw 'There is no folder opened';
}
