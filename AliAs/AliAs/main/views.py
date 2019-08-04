from django.shortcuts import render

# Create your views here.

def main_page(request):
    print ("AliAs main access")
    html_dict = {'title':'AliAs'}

    return render(request,
                   'main/main_page.html',
                   html_dict
                   )

def search_page(request):
    html_dict = {'title':'AliAs'}
    search_target = ""
    
    #get search text
    if 'search_target' in request.GET:
        search_target = request.GET['search_target'] #get 'name'
    print ("search target = " + search_target)
    
    #get search result
    #decorate view
    return render(request,
                   'main/main_page.html',
                   html_dict
                   )
    
