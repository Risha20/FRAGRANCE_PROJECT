# context_processors.py
from .models import Fragrance

def cart_item_count(request):
    cart = request.session.get('cart', {})
    item_count = sum(item['quantity'] for item in cart.values())
    return {'cart_item_count': item_count}