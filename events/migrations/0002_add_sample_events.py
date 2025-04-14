from django.db import migrations

def add_sample_events(apps, schema_editor):
    Event = apps.get_model('events', 'Event')
    events = [
        {
            'name': 'Baalbek International Festival',
            'date': '2025-07-15',
            'location': 'Baalbek',
            'category': 'Music',
            'image': 'https://i.pinimg.com/474x/10/b4/00/10b4009ac2d87bc8c499e4274fa57106.jpg',
            'ticket_link': 'https://baalbekfestival.com/',
            'description': 'Experience the magic of music and history in Baalbek!'
        },
        {
            'name': 'Beirut Jazz Festival',
            'date': '2025-08-20',
            'location': 'Beirut',
            'category': 'Music',
            'image': 'https://i.pinimg.com/474x/8a/7b/8a/8a7b8a9b9b9b9b9b9b9b9b9b9b9b9b9b9b.jpg',
            'ticket_link': 'https://beirutjazzfestival.com/',
            'description': 'A celebration of jazz music in the heart of Beirut'
        },
        {
            'name': 'Byblos International Festival',
            'date': '2025-09-10',
            'location': 'Byblos',
            'category': 'Music',
            'image': 'https://i.pinimg.com/474x/9b/9b/9b/9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b.jpg',
            'ticket_link': 'https://byblosfestival.org/',
            'description': 'Ancient city, modern music festival'
        },
        {
            'name': 'Lebanon Food Festival',
            'date': '2025-10-05',
            'location': 'Beirut',
            'category': 'Food',
            'image': 'https://i.pinimg.com/474x/7a/7a/7a/7a7a7a7a7a7a7a7a7a7a7a7a7a7a7a7a7a.jpg',
            'ticket_link': 'https://lebanonfoodfestival.com/',
            'description': 'Celebrate Lebanese cuisine with top chefs'
        },
        {
            'name': 'Ski Festival',
            'date': '2025-12-15',
            'location': 'Faraya',
            'category': 'Sports',
            'image': 'https://i.pinimg.com/474x/6a/6a/6a/6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a.jpg',
            'ticket_link': 'https://skilebanon.com/',
            'description': 'Annual ski competition and winter sports festival'
        }
    ]
    
    for event_data in events:
        Event.objects.create(**event_data)

def remove_sample_events(apps, schema_editor):
    Event = apps.get_model('events', 'Event')
    Event.objects.all().delete()

class Migration(migrations.Migration):
    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_sample_events, remove_sample_events),
    ] 