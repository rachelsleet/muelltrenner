const apiUrl =
  'https://aru7k5osta.execute-api.eu-north-1.amazonaws.com/default/muelltrenner_getScores?TableName=scores';
export const postScore = async (score: {
  name: string;
  correct: string;
  total: string;
}) => {
  const response = await fetch(`${apiUrl}&limit=10`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    // redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ TableName: 'scores', Item: score }) // body data type must match "Content-Type" header
  });
};

export const fetchScores = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();

  return data.Items;
};
