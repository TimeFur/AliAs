from django.shortcuts import render

# Create your views here.

def main_page(request):
    print ("AliAs main access")
    html_dict = {'title':'AliAs'}

    return render(request,
                   'main/main_page.html',
                   html_dict
                   )
