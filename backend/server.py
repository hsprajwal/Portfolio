from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from models import ContactMessage, ContactMessageCreate, ContactMessageResponse
from typing import List
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Prajwal H S Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Prajwal H S Portfolio API is running", "status": "healthy"}

# Contact form endpoints
@api_router.post("/contact", response_model=ContactMessageResponse)
async def create_contact_message(contact_data: ContactMessageCreate):
    """
    Submit a contact form message
    """
    try:
        # Create contact message object
        contact_message = ContactMessage(**contact_data.dict())
        
        # Save to database
        result = await db.contact_messages.insert_one(contact_message.dict())
        
        if result.inserted_id:
            return ContactMessageResponse(
                success=True,
                message="Thank you for your message! I'll get back to you soon.",
                id=contact_message.id
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save message")
            
    except Exception as e:
        logging.error(f"Error saving contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages(limit: int = 50):
    """
    Get all contact messages (for admin use)
    """
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).limit(limit).to_list(limit)
        return [ContactMessage(**message) for message in messages]
    except Exception as e:
        logging.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact/{message_id}", response_model=ContactMessage)
async def get_contact_message(message_id: str):
    """
    Get a specific contact message by ID
    """
    try:
        message = await db.contact_messages.find_one({"id": message_id})
        if not message:
            raise HTTPException(status_code=404, detail="Message not found")
        return ContactMessage(**message)
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/contact/{message_id}/status")
async def update_message_status(message_id: str, status: str):
    """
    Update the status of a contact message
    """
    try:
        result = await db.contact_messages.update_one(
            {"id": message_id},
            {"$set": {"status": status}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
            
        return {"success": True, "message": "Status updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error updating message status: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Portfolio stats endpoint
@api_router.get("/stats")
async def get_portfolio_stats():
    """
    Get portfolio statistics
    """
    try:
        total_messages = await db.contact_messages.count_documents({})
        recent_messages = await db.contact_messages.count_documents({
            "timestamp": {"$gte": datetime.utcnow().replace(day=1)}
        })
        
        return {
            "total_messages": total_messages,
            "messages_this_month": recent_messages,
            "last_updated": datetime.utcnow()
        }
    except Exception as e:
        logging.error(f"Error fetching stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db_client():
    logger.info("Portfolio API starting up...")

@app.on_event("shutdown")
async def shutdown_db_client():
    logger.info("Portfolio API shutting down...")
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8001, reload=True)