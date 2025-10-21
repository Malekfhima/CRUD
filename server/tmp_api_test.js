const axios = require('axios');

const base = process.env.API_BASE || 'http://localhost:5000/api';

(async () => {
  try {
    console.log('Creating item...');
    const createRes = await axios.post(`${base}/items`, {
      title: 'tmp-node-create',
      price: 11.5,
      description: 'Created by tmp_api_test.js',
    });
    console.log('Created:', createRes.data);

    console.log('\nListing items (first 5):');
    const listRes = await axios.get(`${base}/items`);
    console.log(listRes.data.slice(0, 5));

    const id = createRes.data._id;
    console.log(`\nUpdating item ${id} ...`);
    const updateRes = await axios.put(`${base}/items/${id}`, { price: 22.22 });
    console.log('Updated:', updateRes.data);

    console.log(`\nDeleting item ${id} ...`);
    const delRes = await axios.delete(`${base}/items/${id}`);
    console.log('Delete response:', delRes.data);
  } catch (err) {
    if (err.response) {
      console.error('API error status', err.response.status);
      console.error(err.response.data);
    } else {
      console.error(err.message);
    }
    process.exit(1);
  }
})();
