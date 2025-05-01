from fastapi import APIRouter, Response
import plotly.graph_objects as go
import plotly.express as px
from io import BytesIO
import base64

router = APIRouter()

mock_data = {
    "financials_metrics": {
        "growth_scores": {
            "2022": "233% revenue growth",
            "2023": "154% revenue growth"
        }
    },
    "company_overview": {
        "other_locations": ["Amsterdam-Noord, Amsterdam, Netherlands", "France", "Germany"],
        "headquarters": "Amsterdam, Netherlands",
        "products_services": [
            "Occupational Disability Insurance (AOV)",
            "Business Liability Insurance",
            "Professional Liability Insurance",
            "Business Assets Insurance",
            "Disability Income Protection"
        ]
    },
    "funding_rounds": {
        "rounds": [
            {
                "round_name": "Series A",
                "date": "2022-02-10",
                "amount_raised": "€15 million"
            },
            {
                "round_name": "Series A Extension",
                "date": "2023-06-07",
                "amount_raised": "€10 million"
            }
        ]
    }
}

@router.get("/revenue-growth")
async def get_revenue_growth():
    # Create revenue growth line chart
    years = list(mock_data["financials_metrics"]["growth_scores"].keys())
    growth_values = [int(v.split('%')[0]) for v in mock_data["financials_metrics"]["growth_scores"].values()]
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=years,
        y=growth_values,
        mode='lines+markers',
        name='Revenue Growth',
        line=dict(color='#228BE6', width=3),
        marker=dict(size=10)
    ))
    
    fig.update_layout(
        title="Revenue Growth Trajectory",
        xaxis_title="Year",
        yaxis_title="Growth Rate (%)",
        template="plotly_white",
        height=250,
        margin=dict(l=40, r=40, t=40, b=40)
    )
    
    img_bytes = fig.to_image(format="png")
    return Response(content=img_bytes, media_type="image/png")

@router.get("/market-presence")
async def get_market_presence():
    # Create a map visualization
    locations = mock_data["company_overview"]["other_locations"]
    
    # Create a choropleth map focusing on Europe
    fig = go.Figure(data=go.Choropleth(
        locations=['NLD', 'FRA', 'DEU'],  # ISO codes for Netherlands, France, Germany
        z=[1, 1, 1],  # Values for color intensity
        text=locations,
        colorscale=[[0, '#E9ECEF'], [1, '#40C057']],
        showscale=False
    ))
    
    fig.update_layout(
        geo=dict(
            scope='europe',
            showframe=False,
            showcoastlines=True,
            projection_type='equirectangular'
        ),
        height=250,
        margin=dict(l=0, r=0, t=0, b=0)
    )
    
    img_bytes = fig.to_image(format="png")
    return Response(content=img_bytes, media_type="image/png")

@router.get("/product-portfolio")
async def get_product_portfolio():
    # Create product portfolio pie chart
    products = mock_data["company_overview"]["products_services"]
    
    fig = go.Figure(data=[go.Pie(
        labels=products,
        hole=.3,
        marker=dict(colors=px.colors.qualitative.Set3)
    )])
    
    fig.update_layout(
        showlegend=True,
        height=250,
        margin=dict(l=20, r=20, t=20, b=20)
    )
    
    img_bytes = fig.to_image(format="png")
    return Response(content=img_bytes, media_type="image/png")

@router.get("/investment-history")
async def get_investment_history():
    # Create investment timeline
    rounds = mock_data["funding_rounds"]["rounds"]
    
    fig = go.Figure()
    
    # Add funding rounds as markers
    dates = [round["date"] for round in rounds]
    amounts = [float(round["amount_raised"].split('€')[1].split(' ')[0]) for round in rounds]
    
    fig.add_trace(go.Scatter(
        x=dates,
        y=amounts,
        mode='lines+markers+text',
        name='Funding Rounds',
        text=[round["round_name"] for round in rounds],
        textposition="top center",
        line=dict(color='#FD7E14', width=2),
        marker=dict(size=12)
    ))
    
    fig.update_layout(
        xaxis_title="Date",
        yaxis_title="Amount (€M)",
        template="plotly_white",
        height=250,
        margin=dict(l=40, r=40, t=40, b=40)
    )
    
    img_bytes = fig.to_image(format="png")
    return Response(content=img_bytes, media_type="image/png") 