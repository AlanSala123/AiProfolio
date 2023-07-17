const Portfolio = require("../models/Portfolio.js")
const pool = require("../config/database.js");
const {
  NotFoundError,
  InternalServerError,
  FieldValidationError,
  InvalidCredentialsError,
} = require("../utilities/error")

describe("fetch portfolio", () => {
  test("the fetch portfolio should return a portfolio by its id", async () => {
    const tempId = "1"
    const result = await Portfolio.fetchPortfolio(tempId);
    expect(result).toStrictEqual({
      id: "1",
      name: "test-name",
      user_id: "test-userid",
      template_id: "test-templateid",
      code: "test-code",
      created_at: "test-created-at",
    })
  })

  test("The fetch should return a Not Found Error if the id is not found", async () => {
    const TestTempid = "idnotfound";
    try {
      await Portfolio.fetchPortfolio(TestTempid);
      fail();
    } catch (error) {
      expect(error instanceof NotFoundError).toBeTruthy();
    }
  })

  test("the fetch user should return users portfolios by their ids", async () => {
    const userId = "test-userid";
    const result = await Portfolio.fetchByUser(userId);

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].id).toBeDefined();
    expect(result[0].name).toBeDefined();
    expect(result[0].user_id).toBe(userId);
  })

  test("The fetch should return a Not Found Error if the user_id is not found", async () => {
    const TestTempid = "useridnotfound";
    try {
      await Portfolio.fetchByUser(TestTempid);
      fail();
    } catch (error) {
      expect(error instanceof NotFoundError).toBeTruthy();
    }
  })

  test("the fetch name should return portfolio by name", async () => {
    const name = "test-name";
    const result = await Portfolio.getByName(name);
    expect(result).toStrictEqual({
      id: "1",
      name: "test-name",
      user_id: "test-userid",
      template_id: "test-templateid",
      code: "test-code",
      created_at: "test-created-at",
    })
  })

  test("The fetch should return a Not Found Error if the name is not found", async () => {
    const TestTempid = "namenotfound";
    try {
      await Portfolio.fetchPortfolio(TestTempid);
      fail();
    } catch (error) {
      expect(error instanceof NotFoundError).toBeTruthy();
    }
  })
})

describe("Create", () => {
  test("should create a new portfolio and return the created portfolio object", async () => {
    const portfolioData = {
      id: "1",
      name: "test-portfolio",
      user_id: "test-userid",
      template_id: "test-templateid",
      code: "test-code",
      created_at: "test-created-at",
    }

    const createdPortfolio = await Portfolio.createPortfolio(portfolioData);

    expect(createdPortfolio).toStrictEqual(portfolioData);
  })

//   test("should throw InternalServerError when failed to create a portfolio", async () => {
//     const portfolioData = {
//       id: "1",
//       name: "test-portfolio",
//       user_id: "test-userid",
//       template_id: "test-templateid",
//       code: "test-code",
//       created_at: "test-created-at",
//     }
  
//     const originalQuery = pool.query;
//     pool.query = jest.fn().mockRejectedValue(new Error("Database error"))
  
//     await expect(Portfolio.createPortfolio(portfolioData)).rejects.toThrow(
//       InternalServerError
//     )
  
//     pool.query = originalQuery;
//   })
})

describe("update", () => {
    test("should update portfolio with new name and code", async () => {
        // Prepare the initial portfolio data
        const initialPortfolioData = {
          id: "1",
          name: "test-portfolio",
          code: "test-code",
        }
      
        // Insert the initial portfolio data into the database
        await pool.query(
          `INSERT INTO portfolios (id, name, code)
               VALUES ($1, $2, $3)`,
          [initialPortfolioData.id, initialPortfolioData.name, initialPortfolioData.code]
        )
      
        // Prepare the updated portfolio data
        const updatedPortfolioData = {
          name: "updated-portfolio",
          code: "updated-code"
        }
      
        // Call the updatePortfolio method with the portfolio ID and updated data
        const updatedPortfolio = await Portfolio.updatePortfolio(
          initialPortfolioData.id,
          updatedPortfolioData
        )
      
        // Verify the updated portfolio data
        expect(updatedPortfolio).toEqual({
          id: initialPortfolioData.id,
          name: updatedPortfolioData.name,
          code: updatedPortfolioData.code,
          created_at: expect.any(String),
          template_id: expect.any(String),
          user_id: expect.any(String)
        })
      })
      test("Invalid id will return not found error", async()=>{
        const inValidPortfolioId = "12123"
         try {
             await Portfolio.updatePortfolio(inValidPortfolioId)
             fail()
         } catch (error) {
             expect(error instanceof InternalServerError).toBeTruthy();
         }
     })

     describe("Delete", ()=>{

        test("Portfolio can be deleted", async()=>{
            const id = '1'
            await Portfolio.deletePortfolio(id)
            try {
                await Portfolio.fetchPortfolio(id)
            } catch (error) {
                expect(error instanceof NotFoundError).toBeTruthy()
            }
        })
    
    })
                  
})
