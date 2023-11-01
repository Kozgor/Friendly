import moment from 'moment';

export const sortByDateStartOld = (data: any[]) => data.slice().sort((a, b) => {
  const dateA: any = moment(a.createdAt || a.date);
  const dateB : any = moment(b.createdAt || b.date);
  return dateA - dateB;
});

export const sortByDateStartNew = (data: any[]) => data.slice().sort((a, b) => {
  const dateA: any = moment(a.createdAt || a.date);
  const dateB : any = moment(b.createdAt || b.date);
  return dateB - dateA;
});
