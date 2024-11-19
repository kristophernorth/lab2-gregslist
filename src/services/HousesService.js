import { dbContext } from "../db/DbContext"


class HousesService {

  async getHouses() {
    const houses = await dbContext.Houses
  }

  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId).populate('creator')

    if (house == null) {
      throw new Error(`Invalid house ID: ${this.houseId}`)
    }

    return house
  }

}


export const housesService = new HousesService