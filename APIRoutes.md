Samples from debonairbnb



# Estates

 * GET /estates
 * POST /estates
 * GET /estates/:estateId
 * PATCH /estates/:estateId
 * DELETE /estates/:estateId
 * GET /patrons/:patronId/estates
 * GET /estates/search/:query
 
 * GET /estates/recommended ???

# Critiques
 
 * GET /estates/:estateId/critiques
 * POST /estates/:estateId/critiques
 * GET /critiques/:critiqueId
 * PATCH critiques/:critiqueId
 * DELETE critiques/:critiqueId

# Charters

 * GET /estates/:estateId/charters
   * Get all the charters on an estate
 * GET /charters/:charterId
   * Get a single charter
 * GET /patrons/:patronId/charters
   * Get all of a bookings a patron has made
 * GET /patrons/:patronId/estates/charters
   * Get all of the bookings on a user's estates
 * POST /estates/:estateId/charters
 * PATCH /charters/:charterId
 * DELETE /charters/:charterId

# Patrons

See what the starter gives us
