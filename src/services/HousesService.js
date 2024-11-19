import { dbContext } from "../db/DbContext"


class HousesService {

  async getHouses(houseQuery) {
    const houses = await dbContext.Houses.find(houseQuery).populate('creator')
    return houses
  }

  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId)

    if (house == null) {
      throw new Error(`Invalid house ID: ${houseId}`)
    }

    return house
  }

}


export const housesService = new HousesService