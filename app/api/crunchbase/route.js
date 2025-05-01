import { NextResponse } from 'next/server';

const CRUNCHBASE_API_KEY = '408596511d6d5bbc0f207b041742f125';
const CRUNCHBASE_BASE_URL = 'https://api.crunchbase.com/api/v4';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const companyName = searchParams.get('companyName');
  
  if (!companyName) {
    return NextResponse.json({ error: 'Company name parameter is required' }, { status: 400 });
  }

  try {
    // First, search for the company
    const searchResponse = await fetch(
      `${CRUNCHBASE_BASE_URL}/entities/organizations?field_ids=identifier,image_id,short_description,rank_org_company,founded_on,website,primary_role,location_identifiers&query=${encodeURIComponent(companyName)}&order=rank_org_company&limit=1`,
      {
        headers: {
          'X-Cb-User-Key': CRUNCHBASE_API_KEY,
        },
      }
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to fetch company data from Crunchbase');
    }

    const searchData = await searchResponse.json();
    
    if (!searchData.entities || searchData.entities.length === 0) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const company = searchData.entities[0];
    const companyId = company.identifier.uuid;

    // Get detailed company information
    const detailsResponse = await fetch(
      `${CRUNCHBASE_BASE_URL}/entities/organizations/${companyId}?field_ids=identifier,image_id,short_description,rank_org_company,founded_on,website,primary_role,location_identifiers,funding_rounds,acquisitions,ipo,stock_symbol,stock_exchange,number_of_employees,estimated_revenue_range,categories,parent_organization`,
      {
        headers: {
          'X-Cb-User-Key': CRUNCHBASE_API_KEY,
        },
      }
    );

    if (!detailsResponse.ok) {
      throw new Error('Failed to fetch detailed company data from Crunchbase');
    }

    const detailsData = await detailsResponse.json();
    
    // Process and structure the data
    const structuredData = {
      companyOverview: {
        name: detailsData.properties.identifier.value,
        description: detailsData.properties.short_description,
        website: detailsData.properties.website,
        industry: detailsData.properties.primary_role,
        categories: detailsData.properties.categories,
        foundedDate: detailsData.properties.founded_on,
        location: detailsData.properties.location_identifiers,
        parentOrganization: detailsData.properties.parent_organization,
      },
      financialMetrics: {
        employeeCount: detailsData.properties.number_of_employees,
        revenueRange: detailsData.properties.estimated_revenue_range,
      },
      fundingHistory: {
        fundingRounds: detailsData.properties.funding_rounds?.map(round => ({
          amount: round.money_raised,
          date: round.announced_on,
          investors: round.investors,
          roundType: round.round_type,
        })),
        ipo: detailsData.properties.ipo ? {
          date: detailsData.properties.ipo.date,
          amount: detailsData.properties.ipo.money_raised,
          stockSymbol: detailsData.properties.stock_symbol,
          stockExchange: detailsData.properties.stock_exchange,
        } : null,
      },
      acquisitions: detailsData.properties.acquisitions?.map(acquisition => ({
        date: acquisition.announced_on,
        amount: acquisition.price,
        acquiredCompany: acquisition.acquired_organization,
      })),
    };

    return NextResponse.json(structuredData);
  } catch (error) {
    console.error('Error fetching Crunchbase data:', error);
    return NextResponse.json({ error: 'Failed to fetch company data' }, { status: 500 });
  }
} 