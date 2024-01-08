
export class Bytebeat {
// https://bitboxconsole.blogspot.com/2016/03/answer-to-preceding-post-bytebeat.html
generate(ut: number, form: number)
{
  
    const t =ut;

  switch (form) {
    case 0: return (t * (t >> 8 | t >> 9) & 46 & t >> 8) ^ ((t & t >> 13) | t >> 6);
    case 1 : return (t | (t >> 9 | t >> 7)) * t & (t >> 11 | t >> 9); break; // by red-
    case 2 : return (t * 5 & (t >> 7)) | (t * 3 & (t * 4 >> 10)); break;
    case 3 : return t * (41 & t >> 10); break; // by .. many
    case 4 : return (t >> (t >> 5 * (t >> 13) % 8)) | (t >> 4) ; // by The_Cjay
    case 5 : return t * ((t >> 13) & 31 & t >> 9) - ((t >> 7) & 23 & t >> 3); break; // ack
    case 6 : return (t * 3 & (t >> 9)) | (t * 3 & (t * 4 >> 10)); break;
    
  }

  return 0;
}
}
