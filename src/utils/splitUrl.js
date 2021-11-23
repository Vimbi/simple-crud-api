const splitUrl = (req) => {

  const { method, url } = req;
  console.log('url:', url);

  const currentUrl = new URL(url, 'http://localhost:3000');
  console.log('currentUrl:', currentUrl);

  const { pathname } = currentUrl;
  console.log('pathname:', pathname);
  console.log('pathname.slpit:', pathname.split('/'));
  // if (pathname.split('/')[3]) throw new Error('Invalid url');

  const pathFirstLevel = pathname.split('/')[1];
  console.log('pathFirstLevel:', pathFirstLevel);

  const id = pathname.split('/')[2];
  console.log('id:', id);

  return { method, pathFirstLevel, id, }
}

module.exports = splitUrl;