function openOutOfOfficeComposer(){
  console.log("GmailOutOfOffice MailView Button Pressed")
  window.openDialog("chrome://gmailoutofoffice/content/mailview/dialog.xul", "OutOfOfficeWindow", "chrome,resizable=no,scrollbars=no,status=no,centerscreen=yes");
};