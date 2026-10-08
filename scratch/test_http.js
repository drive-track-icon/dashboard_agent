const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    const overviewMatch = data.match(/<section[^>]*id="pageOverview"[\s\S]*?<\/section>/);
    if (overviewMatch) {
      const overviewHtml = overviewMatch[0];
      console.log('Overview Section found, length:', overviewHtml.length);
      console.log('Contains metrics-grid inside Overview:', overviewHtml.includes('metrics-grid'));
      console.log('Contains filterOverviewCategory inside Overview:', overviewHtml.includes('id="filterOverviewCategory"'));
    } else {
      console.log('Overview Section not found!');
    }
  });
}).on('error', err => console.error(err));
