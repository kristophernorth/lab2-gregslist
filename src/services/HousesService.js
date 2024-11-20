import { dbContext } from "../db/DbContext"


class HousesService {
  async getHouseById(houseId) {
    const house = await (await dbContext.Houses.findById(houseId)).populate('creator')

    if (house == null) {
      throw new Error(`Invalid house ID: ${houseId}`)
    }

    return house
  }

  async getHouses(houseQuery) {
    const pageNumber = parseInt(houseQuery.page) || 1
    const houseLimit = 10
    const skipAmount = (pageNumber - 1) * houseLimit
    delete houseQuery.page
    // const houses = await dbContext.Houses.find(houseQuery).populate('creator')
    // return houses

    const sortBy = houseQuery.sortBy
    delete houseQuery.sortBy

    const houses = await dbContext.Houses
      .find(houseQuery)
      .sort(sortBy)
      .skip(skipAmount)
      .limit(houseLimit)
      .populate('creator')

    const houseCount = await dbContext.Houses.countDocuments(houseQuery)

    const houseResponse = {
      count: houseCount,
      page: pageNumber,
      totalPages: Math.ceil(houseCount / houseLimit),
      results: houses,
    }

    return houseResponse

  }

}


export const housesService = new HousesService