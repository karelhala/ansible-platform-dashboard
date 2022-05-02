const downloadFile = (href) => {
  const link = document.createElement('a');

  link.setAttribute('href', href);
  link.setAttribute('target', '_self');
  link.style.visibility = 'hidden';

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

export default downloadFile;
