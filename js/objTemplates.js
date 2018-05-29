/* default bare-bones templates for commonly used objects */

var templates = {
  breastRow: {
    rating: 0, /* to-do: define global type constants */
    nipples: {
      type: 0, /* 1: dick-nipples, 2: no nipples */
      length: 0.2, /* length in inches */
      nipplesPerBreast: 1,
      /* Todo: If nipple.type==1, the game should be able to read a 'cock' object
         nested under 'nipples' here which stores info about the dick-nipple type */
      cock: {
        /* populated by game */
      }
    },
  },
  cock: {
    type: 0,
    length: 5, /* length in inches */
    location: 0, /* 0 for normal, 1 for a dick-nipple (located on breast). Getter function for cocks
                 will combine dicknipples and regular dicks so they can get handled evenly
                 by transformatives and stuff. */
  },
};
